# Library Server API

A RESTful API for managing a library system.  
This is a **learning project** created to practice backend development using Node.js and Express.

---

## Project Purpose

The purpose of this project is to implement a library management API that supports:
- Managing books
- Managing users
- Borrowing and returning books
- Working with a database
- Designing a RESTful server architecture

---

## Technologies & Libraries

- **Node.js**
- **Express.js**
- **JavaScript (ES Modules)**

Main libraries used:
```js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
```

---

## Project Structure

The server is organized using dedicated routes:
- Book routes
- User routes

Each route handles CRUD operations according to REST principles.

---

## Main Routes

### Books
- Get all books (with search and pagination):  
  `GET /books?page=1&limit=5&name=searchWord`

- Get book by ID:  
  `GET /books/:id`

- Add a new book:  
  `POST /books`

- Update book details:  
  `PUT /books/:id`

- Borrow a book:  
  `PATCH /books/borrow/:id/:username`

- Return a book:  
  `PATCH /books/:id`

- Delete a book:  
  `DELETE /books/:id`

---

### Users
- Get all users:  
  `GET /users`

- User sign-in:  
  `GET /users/sign-in`

- User sign-up:  
  `POST /users/sign-up`

---

## Installation & Running

### Prerequisites
- Node.js
- Database (connection string is defined in `.env`)

### Installation
```bash
git clone https://github.com/ShoshiS/library-server.git
cd library-server
npm install
```

### Environment Variables
Create a `.env` file with your database connection details, for example:
```env
DATABASE_URL=your_database_connection_string
PORT=3000
```

### Run the Server
```bash
npm start
```

---

## Project Status
Educational project – created for learning and practicing backend and REST API development.

---

## Notes
- No automated tests included
- No linting configuration
- Focus is on code structure, logic, and clarity
