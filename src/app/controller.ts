import { Router, Request, Response } from 'express';

import service from 'app/service';

const router = Router();

/** 
@route           GET /api/loans/:borrowerId
@param           {String} borrowerId
@description     List all loans by a borrower
@access          Public
**/
router.get('/loans/', (request: Request, response: Response) => {
    const firstName: string = <string>request.query.firstName || '';
    const lastName: string = <string>request.query.lastName || '';

    const result = service.getAllLoansByName(firstName, lastName);

    const getResponse = {
        "success": true,
        "message": result.message,
        "data": result.data
    }

    response.status(200).send(getResponse);
});

/** 
@route           GET /api/loans/:borrowerId
@param           {String} borrowerId
@description     List all loans by a borrower
@access          Public
**/
router.get('/loans/:borrowerId', (request: Request, response: Response) => {
    const borrowerId = request.params.borrowerId;
    const result = service.getAllLoansByBorrowerId(borrowerId);

    const getResponse = {
        "success": true,
        "message": result.message,
        "data": result.data
    }

    response.status(200).send(getResponse);
});

/**
@route           POST /api/loans/apply
@description     Apply for a loan
@param           {number} amount
                 {number} term (in months)
                 {string} name
                 {string} borrowerId
@access          Public
**/
router.post('/loans/apply', (request: Request, response: Response) => {
    const { amount, term, borrowerId, name } = request.body;

    let getResponse = {
        success: false,
        message: 'Error in loan application:',
        result : {} as any
    }
    
    if (!borrowerId) {
        getResponse.message = (getResponse.message || '') + '   borrowerId is required';    
    }

    if (!name) {
        getResponse.message = (getResponse.message || '') + '   name is required';
    }

    if (borrowerId && name) {
        const result = service.applyForLoan(amount, term, borrowerId, name);
        getResponse.success = true;
        getResponse.message = 'Loan application processed successfully'
        getResponse.result = result;
    }

    response.status(200).send(getResponse);
});

export default router;