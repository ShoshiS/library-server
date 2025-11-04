# Book Server API

A simple RESTful API for managing a collection of **books** and **users**, built with **Express.js**.

---

## Features

### Books
- **List all books** with pagination and optional search by name.  
  `GET /books?page=1&limit=5&name=word`
- **Get a single book** by ID.  
  `GET /books/:id`
- **Add a new book.**  
  `POST /books`
- **Update a book** (full update).  
  `PUT /books/:id`
- **Borrow a book** by username.  
  `PATCH /books/borrow/:id/:username`
- **Return a borrowed book.**  
  `PATCH /books/:id`
- **Delete a book.**  
  `DELETE /books/:id`

---

### Users
- **List all users.**  
  `GET /users`
- **Sign in.**  
  `GET /users/sign-in`
- **Sign up.**  
  `POST /users/sign-up`

