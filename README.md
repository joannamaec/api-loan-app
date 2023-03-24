# Backend Services and API Development

## Prerequisites

* [Node.js](https://nodejs.org/en)

### Running the API
* First, install all node dependencies `npm i`.
* Tests can be run with the command `npm test`.
* Start the server using the command `npm start`. This will open up server running on `http://localhost:4000`.

From a Request client (i.e. [Postman](https://www.postman.com/)), the following endpoints are available:

| **Method** | **Route**                                               | **Request**                                                                                                                                                                                                                      |
|------------|---------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **GET**    | /api/loans/?firstName={first_name}&lastName={last_name} | first_name - borrower's first name last_name - borrorwer's last name                                                                                                                                                             |
| **GET**    | /api/loans/:borrowerId                                  | borrowerId - borrower's personal ID (format: A####)                                                                                                                                                                              |
| **POST**   | /api/loans/apply                                        | (all fields required) {  amount: number,  term: number,  borrowerId: string,  name: string }  amount: amount to borrow term: payback period (in months) borrowerId: borrower's personal ID name: borrower's first and last names |


### Frameworks, Tools, and Libraries Used
* Typescript, Node.js
* Express, Mocha, Chai

## Authors

* **Joanna Mae Cabuyadao** - [GitHub](https://github.com/jmjcabuyadao) | [LinkedIn](https://www.linkedin.com/in/jmjcabuyadao)