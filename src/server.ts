import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

import router from 'app/controller';

const createServer = () => {
    const app: Application = express();
    
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    app.use('/api', router);

    app.get('/', (request: Request, response: Response) => {
        response.status(200).send('Hello World!');
    });

    return app;
};

export default createServer;