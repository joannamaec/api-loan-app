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
| **GET**    | /api/loans/?firstName={first_name}&lastName={last_name} | first_name - borrower's first name<br/>last_name - borrorwer's last name                                                                                                                                                             |
| **GET**    | /api/loans/:borrowerId                                  | borrowerId - borrower's personal ID<br/>(format: A####)                                                                                                                                                                              |
| **POST**   | /api/loans/apply                                        | (all fields required)<br/>{<br/>&nbsp;&nbsp;&nbsp;amount: number,<br/>&nbsp;&nbsp;&nbsp;term: number,<br/>&nbsp;&nbsp;&nbsp;borrowerId: string,<br/>&nbsp;&nbsp;&nbsp;name: string<br/>   }<br/><br/>amount: amount to borrow<br/>term: payback period (in months)<br/>borrowerId: borrower's personal ID<br/>name: borrower's first and last names |
||||

### Frameworks, Tools, and Libraries Used
* Typescript, Node.js
* Express, Mocha, Chai

## Authors

* **Joanna Mae Cabuyadao** - [GitHub](https://github.com/jmjcabuyadao) | [LinkedIn](https://www.linkedin.com/in/jmjcabuyadao)