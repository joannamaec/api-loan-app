import model, { Application, Borrower } from "app/model";

const computeTotalPayment = (principal : number, term : number, rate : number) => {
    let monthlyPayment = computeMonthlyPayment(principal, term, rate);

    return parseFloat((term * monthlyPayment).toFixed(2));
}

const computeMonthlyPayment = (principal : number, term : number, rate : number) => {

    return parseFloat(((principal / term) * (1 + rate)).toFixed(2));
}

const getLoanQuotation = (amount: number, term: number) => {

    return {
        "monthlyPayment": computeMonthlyPayment(amount, term, 0.05),
        "totalPayment": computeTotalPayment(amount, term, 0.05)
    }
}

const getAllLoansByName =  (firstName: string, lastName: string) => {
    const borrower = model.getBorrowerByName(firstName, lastName);

    if (!borrower) {
        return {  message: "Borrower not found", data: [] };
    }

    const loans = model.getLoansByBorrowerId(borrower.borrower_id);
    const message = loans.length == 0 ? 'No loan applications found' : 'Loan applications found';

    return { message: message, data: loans };
};

const getAllLoansByBorrowerId =  (borrowerId: string) => {
    const borrower = model.getBorrowerById(borrowerId);

    if (!borrower) {
        return {  message: "Borrower not found", data: [] };
    }

    const loans = model.getLoansByBorrowerId(borrowerId);
    const message = loans.length == 0 ? 'No loan applications found' : 'Loan applications found';

    return { message: message, data: loans };
};


const applyForLoan = (amount: number, term: number, borrowerId: string, name: string) => {
    const borrowerWithId = model.getBorrowerById(borrowerId);
    if (!borrowerWithId) {

        return {
            status: "Rejected",
            reason: "Borrower information not found"
        };
    }

    let firstName = '';
    let lastName = '';
    if (name) [firstName, lastName] = name.split(' ');

    if (borrowerWithId.first_name != firstName || borrowerWithId.last_name != lastName) {

        return {
            status: "Rejected",
            reason: "Borrower information do not match"
        };
    }

    const borrowerWithName = model.getBorrowerByName(firstName, lastName);
    if (borrowerWithName && borrowerWithName.borrower_id != borrowerId) {

        return {
            status: "Rejected",
            reason: "Borrower information do not match"
        };
    }

    if (model.isBorrowerInBlacklist(borrowerId)) {

        return {
            status: "Rejected",
            reason: "Borrower is blacklisted"
        };
    }

    const dateNow = new Date()
    const yearNow = dateNow.getFullYear()
    const monthNow = (dateNow.getMonth()+1).toString().padStart(2, '0')
    const dayNow = dateNow.getDate()

    const dateParam = `${yearNow}-${monthNow}-${(dayNow-1).toString().padStart(2, '0')}`
    const timeParam = `${dateNow.getHours().toString().padStart(2, '0')}:${dateNow.getMinutes().toString().padStart(2, '0')}:${dateNow.getSeconds().toString().padStart(2, '0')}`

    const outstandingLoans = model.getLoansByDateTime(dateParam, timeParam);
    
    if (outstandingLoans.filter(loan => loan.borrower_id == borrowerId).length >= 3) {
        return {
            status: "Rejected",
            reason: "Borrower has 3 or more outstanding loans within the last 24 hours"
        };
    }

    const { monthlyPayment, totalPayment } = getLoanQuotation(amount, term)

    const application : Application = {
        amount: amount,
        term: term,
        date: `${yearNow}-${monthNow}-${dayNow.toString().padStart(2, '0')}`,
        time: timeParam,
        borrower_id: borrowerId,
    }

    if (model.appendToList(application)) {
        return {
            status: "Approved",
            loanAmount: amount,
            loanTerm: `${term} months`,
            borrowerId,
            monthlyPayment,
            totalPayment
        }
    }

    return {
        status: "Rejected",
        reason: "Loan application failed"
    }
};

export default { 
    getAllLoansByName,
    getAllLoansByBorrowerId,
    applyForLoan,
    getLoanQuotation
};