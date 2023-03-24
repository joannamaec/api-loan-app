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
    it('should return a list of loan applications',  (done) => {
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
        done();
    });

    it('should return an empty list',  (done) => {
        const noLoanBorrowerId = "P1882"
        const expected = {
            message: "No loan applications found",
            data: []
        }

        expect( service.getAllLoansByBorrowerId(noLoanBorrowerId)).to.deep.equal(expected);
        done();
    });

    it('should return a warning',  (done) => {
        const notFoundBorrowerId = "Y2841";
        const expected = {
            message: "Borrower not found",
            data: []
        }

        expect( service.getAllLoansByBorrowerId(notFoundBorrowerId)).to.deep.equal(expected);
        done();
    });
});

describe('Loan Retrieval by Borrower Name', () => {
    it('should return a list of loan applications',  (done) => {
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

        expect( service.getAllLoansByName(validFirstName, validLastName)).to.deep.equal(expected);
        done();
    });

    it('should return an empty list',  (done) => {
        const noLoanFirstName = 'Alexander';
        const noLoanLastName = 'von Neumann';

        const expected = {
            message: "No loan applications found",
            data: []
        }

        expect( service.getAllLoansByName(noLoanFirstName, noLoanLastName)).to.deep.equal(expected);
        done();
    });

    it('should return a warning',  (done) => {
        const notFoundFirstName = 'Matthias';
        const notFoundLastName = 'Bellini';

        const expected = {
            message: "Borrower not found",
            data: []
        }

        expect( service.getAllLoansByName(notFoundFirstName, notFoundLastName)).to.deep.equal(expected);
        done();
    });
});