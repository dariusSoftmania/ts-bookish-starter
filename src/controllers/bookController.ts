import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Connection } from 'tedious';
import 'dotenv/config';
var RequestTedious = require('tedious').Request;
import { Book } from '../objetcs/Book';

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

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:id', this.getBook.bind(this));
        this.router.get('/', this.getBooks.bind(this));

        this.router.post('/', this.createBook.bind(this));
    }

    getBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    createBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    getBooks(req: Request, res: Response) {
        // TODO: implement functionality
        let books: Book[];
        connection.on('connect', function (err) {
            if (err) {
                console.log('Error: ', err);
            }
            // If no error, then good to go...
            books = getBooksFromDatabase();
        });

        // Initialize the connection.
        connection.connect();
        console.log("in call:" + books);

        return res.status(500).json({
            error: 'server_error',
            error_description: 'Hello there',
        });
    }
}

function getBooksFromDatabase(): Book[] {
    const request = new RequestTedious('select * from Books', function (
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

    let books: Book[] = [];

    request.on('row', function (columns) {
        const book: Book = new Book(
            columns[0].value,
            columns[1].value,
            columns[2].value,
            columns[3].value,
            columns[4].value,
        );
        console.log(book);
        books.push(book);
        // columns.forEach(function (column) {
        //     // console.log(column);
        //     console.log(column.value);
        // });
    });

    console.log("CHECK BOOKS: " + books);
    connection.execSql(request);
    return books;
}

export default new BookController().router;
