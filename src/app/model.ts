import fs from 'fs';

import blacklist from 'data/blacklist.json';
import applications from 'data/applications.json';
import borrowers from 'data/borrowers.json';

export type Borrower = {
    borrower_id: string;
    first_name: string;
    last_name: string;
}

export type Application = {
    amount: number;
    term: number;
    date: string;
    time: string;
    borrower_id: string;
}

const getBorrowers = () : Borrower[] => { return borrowers as Borrower[]; };
const getApplications = () : Application[] => { return applications as Application[]; };


const getBorrowerById  = (borrowerId: string) => {
    const borrower = getBorrowers().find(borrower => borrower.borrower_id === borrowerId);

    return borrower;
}

const getBorrowerByName = (firstName: string, lastName: string) => {
    const borrower = getBorrowers().find(borrower => borrower.first_name === firstName && borrower.last_name === lastName);

    return borrower;
}

const getLoansByBorrowerId = (borrowerId: string) => {
    const loans: Application[] = getApplications().filter(application => application.borrower_id === borrowerId);

    return loans || [];
}

const getLoansByDateTime =  (date: string, time: string) => {
    const withinLastFullDay = (appDate : string, appTime : string, yestDate : string, yestTime : string) => {
        const applicationDate = Date.parse(`${appDate} ${appTime}`);
        const baselineDate = Date.parse(`${yestDate} ${yestTime}`);

        return applicationDate >= baselineDate
    }

    return getApplications().filter(application => withinLastFullDay(application.date, application.time, date, time));
}

const isBorrowerInBlacklist = (borrowerId: string) => {
    
    return blacklist.includes(borrowerId);
}

const appendToList = (application: Application) => {
    const dataStore = `${process.cwd()}/src/data/applications.json`;

    try {
        if (!fs.existsSync(dataStore)) {
            //create new file if not exist
            fs.closeSync(fs.openSync(dataStore, 'w'));
        }
    
        // read file
        const file = fs.readFileSync(dataStore)
    
        //check if file is empty
        if (file.length == 0) {
            // add data to json file
            fs.writeFileSync(dataStore, JSON.stringify( [ application ] ))
        } else {
            //append data to json file
            const applications = JSON.parse(file.toString())
    
            //add json element to json object
            applications.push(application);
            fs.writeFileSync(dataStore, JSON.stringify(applications, null, 4));
        }
    
        console.log('Application added to list');

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
};

export default {
    getBorrowerById,
    getBorrowerByName,
    getLoansByBorrowerId,
    getLoansByDateTime,
    isBorrowerInBlacklist,
    appendToList
}