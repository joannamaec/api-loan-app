import request from 'supertest';
import { expect } from 'chai';

import createServer from 'server'

const app = createServer();

describe('Server Functionality', () => { 
    it('should start server successfully', (done) => {
        request(app)
          .get('/')
          .expect(200)
          .end((err, res) => {
            expect(res.text).to.equal('Hello World!');
            done();
          });
    });
});

describe('GET Methods', () => {
    const endpoint = `/api/loans`;

    it('should return a list of loan applications with borrowerId input', (done) => {
        const validBorrowerId = "B6965";

        request(app)
            .get(`${endpoint}/${validBorrowerId}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.all.keys('success', 'message', 'data');
                expect(res.body.message).to.be.equal('Loan applications found');
                expect(res.body.data).to.be.an('array').to.have.lengthOf(2);
                done();
            });
    });

    it('should return a `No loan applications found` response with borrowerId input', (done) => {
        const noLoanBorrowerId = "P1882"

        request(app)
            .get(`${endpoint}/${noLoanBorrowerId}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.all.keys('success', 'message', 'data');
                expect(res.body.message).to.be.equal('No loan applications found');
                expect(res.body.data).to.be.an('array').to.have.lengthOf(0);
                done();
            });
    });

    it('should return a `Borrower not found` response with borrowerId input', (done) => {
        const notFoundBorrowerId = "Y2841";

        request(app)
            .get(`${endpoint}/${notFoundBorrowerId}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.all.keys('success', 'message', 'data');
                expect(res.body.message).to.be.equal('Borrower not found');
                expect(res.body.data).to.be.an('array').to.have.lengthOf(0);
                done();
            });
    });

    it('should return a list of loan applications with borrower name input', (done) => {
        const validFirstName = 'Nissy';
        const validLastName = 'Hawick';

        request(app)
            .get(`${endpoint}/?firstName=${validFirstName}&lastName=${validLastName}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.all.keys('success', 'message', 'data');
                expect(res.body.message).to.be.equal('Loan applications found');
                expect(res.body.data).to.be.an('array').to.have.lengthOf(2);
                done();
            });
    });

    it('should return a `No loan applications found` response with borrower name input', (done) => {
        const noLoanFirstName = 'Alexander';
        const noLoanLastName = 'von Neumann';

        request(app)
            .get(`${endpoint}/?firstName=${noLoanFirstName}&lastName=${noLoanLastName}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.all.keys('success', 'message', 'data');
                expect(res.body.message).to.be.equal('No loan applications found');
                expect(res.body.data).to.be.an('array').to.have.lengthOf(0);
                done();
            });
    });

    it('should return a `Borrower not found` response with borrower name input', (done) => {
        const notFoundFirstName = 'Neil';
        const notFoundLastName = 'Melendez';

        request(app)
            .get(`${endpoint}/?firstName=${notFoundFirstName}&lastName=${notFoundLastName}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.all.keys('success', 'message', 'data');
                expect(res.body.message).to.be.equal('Borrower not found');
                expect(res.body.data).to.be.an('array').to.have.lengthOf(0);
                done();
            });
    });

});

describe('POST Methods', () => {
    const endpoint = `/api/loans/apply`;
    
});