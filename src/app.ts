import express from 'express';
import 'dotenv/config';
import { Connection, Request } from 'tedious';
import dotenv from 'dotenv';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';

const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

dotenv.config();

// Validate required environment variables
function getEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

// Export strongly typed config
export const CONFIG = {
    dbUsername: getEnvVar('DB_USERNAME'),
    dbPassword: getEnvVar('DB_PASSWORD'),
};

const config = {
    server: 'localhost',
    options: {
        database: 'bookish',
        trustServerCertificate: true,
    },
    authentication: {
        type: 'default',
        options: {
            userName: CONFIG.dbUsername,
            password: CONFIG.dbPassword,
        },
    },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const connection = new Connection(config);

connection.on('connect', function (err) {
    if (err) {
        console.log('Error: ', err);
    }
    // If no error, then good to go...
    executeStatement();
});

// Initialize the connection.
connection.connect();

function executeStatement() {
    const request = new Request('select * from Users', function (
        err,
        rowCount,
    ) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
            // and we close the connection
            connection.close();
        }
    });

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            console.log(column.value);
        });
    });

    connection.execSql(request);
}

/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);
