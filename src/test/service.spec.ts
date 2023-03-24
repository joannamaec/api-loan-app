import chai, { expect } from 'chai';
chai.config.truncateThreshold = 0; // disable truncating
chai.config.showDiff = true; // turn on reporter diff display
chai.config.includeStack = true; // turn on stack trace

import service from 'app/service'

describe('Loan Computation', () => {
    it('should get loan quotation', () => {
        expect(service.getLoanQuotation(6725.00, 24)).to.deep.equal({
            "monthlyPayment": 294.22,
            "totalPayment": 7061.28
        });
    });
});

describe('Loan Retrieval by Borrower ID', () => {
    it('should return a list of loan applications', () => {
        const validBorrowerId = "C0008";
        const expected = {
            message: "Loan applications found",
            data: [{
                "amount": 9558.00,
                "term": 2,
                "date": "2023-03-20",
                "time": "02:21:30",
                "borrower_id": "C0008"
              }]
        }

        expect( service.getAllLoansByBorrowerId(validBorrowerId)).to.deep.equal(expected);
    });

    it('should return an empty list', () => {
        const noLoanBorrowerId = "P1882"
        const expected = {
            message: "No loan applications found",
            data: []
        }

        expect(service.getAllLoansByBorrowerId(noLoanBorrowerId)).to.deep.equal(expected);
    });

    it('should return a warning', () => {
        const notFoundBorrowerId = "Y2841";
        const expected = {
            message: "Borrower not found",
            data: []
        }

        expect(service.getAllLoansByBorrowerId(notFoundBorrowerId)).to.deep.equal(expected);
    });
});

describe('Loan Retrieval by Borrower Name', () => {
    it('should return a list of loan applications', () => {
        const validFirstName = 'Basia';
        const validLastName = 'Kidds';
        
        const expected = {
            message: "Loan applications found",
            data: [{
                "amount": 9558.00,
                "term": 2,
                "date": "2023-03-20",
                "time": "02:21:30",
                "borrower_id": "C0008"
              }]
        }

        expect(service.getAllLoansByName(validFirstName, validLastName)).to.deep.equal(expected);
    });

    it('should return an empty list', () => {
        const noLoanFirstName = 'Alexander';
        const noLoanLastName = 'von Neumann';

        const expected = {
            message: "No loan applications found",
            data: []
        }

        expect( service.getAllLoansByName(noLoanFirstName, noLoanLastName)).to.deep.equal(expected);
    });

    it('should return a warning', () => {
        const notFoundFirstName = 'Matthias';
        const notFoundLastName = 'Bellini';

        const expected = {
            message: "Borrower not found",
            data: []
        }

        expect(service.getAllLoansByName(notFoundFirstName, notFoundLastName)).to.deep.equal(expected);
    });
});

describe('Loan Application', () => {
    it('should reject application due to invalid borrower ID', () => {
        const notFoundBorrowerId = "Y2841";
        const notFoundName = 'Matthias Bellini';

        const result = service.applyForLoan(1000, 12, notFoundBorrowerId, notFoundName)
        
        expect(result).to.have.all.keys('status', 'reason');
        expect(result.status).to.be.equal('Rejected');
        expect(result.reason).to.be.equal('Borrower information not found');
    });

    it('should reject application due to detail mismatch', () => {
        const validBorrowerId = "C0008";
        const notFoundName = 'Matthias Bellini';

        const result = service.applyForLoan(1000, 12, validBorrowerId, notFoundName)

        expect(result).to.have.all.keys('status', 'reason');
        expect(result.status).to.be.equal('Rejected');
        expect(result.reason).to.be.equal('Borrower information do not match');
    });

    it('should reject application due to blacklisted borrower', () => {
        const blacklistedBorrowerId = "S8881";
        const notFoundName = 'Matthias Bellini';

        const result = service.applyForLoan(1000, 12, blacklistedBorrowerId, notFoundName)

        expect(result).to.have.all.keys('status', 'reason');
        expect(result.status).to.be.equal('Rejected');
        expect(result.reason).to.be.equal('Borrower is blacklisted');
    })
});