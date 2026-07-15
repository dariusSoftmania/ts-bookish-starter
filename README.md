# Typescript Bookish Starter

## Overview

This repo contains a starter Express server for use in the Bookish bootcamp exercise. Full details of this exercise are on the Swiki page.

## Developer Setup

1. If you haven't already, install Node.js v16.13.0, NPM and NVM. There are instructions for how to do this on Windows (with and without WSL) [here](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-overview).
2. Install [VSCode](https://code.visualstudio.com/download) (or another preferred editor). VSCode is recommended unless you have a strong preference otherwise due to its good compatibility with typescript, excellent community extensions and for consistency across all developers when pairing.
3. Install the project dependencies with `npm install`.
4. Run the code!
     - Run in development mode with hot reloading with `npm run dev`
     - Run without hot reloading using `npm start`
     - You can check that the formatting of all files is acceptable using `npm run lint`

## Database setup
Run the following commands to create and populate the necessary tables:
```sql
CREATE TABLE	 Users (
	id int PRIMARY KEY,
	username varchar(50) NOT NULL,
	password varchar(50) NOT NULL
);

CREATE TABLE	 Books (
	id int PRIMARY KEY,
	isbn int NOT NULL,
	title varchar(50) NOT NULL,
	copyCount int NOT NULL,
	reservedCount int NOT NULL,
);

CREATE TABLE	 Reservations (
	id int PRIMARY KEY,
	bookId int,
	userId int,
	returnDate DATE,
	dueDate DATE NOT NULL,
	boroughDate DATE NOT NULL,
	FOREIGN KEY (bookId) REFERENCES Books(id),
	FOREIGN KEY (userId) REFERENCES Users(id)
);


CREATE TABLE	 Authors (
	id int PRIMARY KEY,
	username varchar(50) NOT NULL
);

CREATE TABLE	 BookAuthors (
	BookId int,
	AuthorId int,
	FOREIGN KEY (bookId) REFERENCES Books(id),
	FOREIGN KEY (authorId) REFERENCES Authors(id)
);


INSERT INTO Users
VALUES (1, 'Darius', 'very_good_password');

INSERT INTO Users
VALUES (2, 'Octav', 'very_very_good_password');

INSERT INTO Books
VALUES (1, 12345, 'To Kill a Mockingbird', 5, 0);

INSERT INTO Books
VALUES (2, 54321, '1984', 2, 0);

INSERT INTO Books
VALUES (3, 22222, 'Anna Karenina', 3, 0);

INSERT INTO Books
VALUES (4, 67, 'Madame Bovary', 1, 0);

INSERT INTO Books
VALUES (5, 6767, 'War and Peace', 1, 1);

INSERT INTO Books
VALUES (6, 2374, 'Good Omens', 2, 0);

INSERT INTO Books
VALUES (7, 7238, 'The Colour of Magic', 1, 0);

INSERT INTO Authors
VALUES (1, 'Harper Lee');

INSERT INTO Authors
VALUES (2, 'George Orwell');

INSERT INTO Authors
VALUES (3, 'Leo Tolstoy');

INSERT INTO Authors
VALUES (4, 'Gustave Flaubert');

INSERT INTO Authors
VALUES (5, 'Terry Pratchett');

INSERT INTO Authors
VALUES (6, 'Neil Gaiman');

INSERT INTO BookAuthors
VALUES (1, 1);

INSERT INTO BookAuthors
VALUES (2, 2);

INSERT INTO BookAuthors
VALUES (3, 3);

INSERT INTO BookAuthors
VALUES (4, 4);

INSERT INTO BookAuthors
VALUES (5, 3);

INSERT INTO BookAuthors
VALUES (6, 5);

INSERT INTO BookAuthors
VALUES (6, 6);

INSERT INTO BookAuthors
VALUES (7, 5);

INSERT INTO Reservations
VALUES (1, 5, 1, NULL, CONVERT(DATE, '29/10/2027', 103), CONVERT(DATE, '29/10/2025', 103));

INSERT INTO Reservations
VALUES (2, 3, 1, CONVERT(DATE, '29/10/2026', 103), CONVERT(DATE, '29/10/2027', 103), CONVERT(DATE, '29/10/2025', 103));
```