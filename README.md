# 📚 Book Review API – Billeasy Backend Assignment

A RESTful API built with Node.js, Express, and MongoDB that allows users to sign up, log in, add books, and leave reviews. This project was developed as part of a backend assignment for Billeasy.

## 🚀 Features

- JWT-based Authentication (`signup`, `login`)
- Add / View Books
- Add / Edit / Delete Reviews for Books
- Book Search by Title, Author, or Genre
- Secure Routes for Authenticated Users
- Zod-based validation (optional enhancement)

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **Validation:** Zod
- **Environment Config:** dotenv

## 🗂️ Project Structure

📦 root
├── 📁 controllers
├── 📁 middleware
├── 📁 models
├── 📁 routes
├── 📄 server.js
├── 📄 .env.example
├── 📄 .gitignore
└── 📄 README.md


## 🔐 Environment Variables

Create a `.env` file in the root with the following:

PORT=5000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_secret_key_here


Refer `.env.example` for structure.

## ▶️ Getting Started

### 1. Clone the repo


git clone https://github.com/nikhilshakya07/Book-review-API-Billeasy-assignment.git
cd Book-review-API-Billeasy-assignment

### 2. Install dependencies

npm install

### 3. Setup .env
Create a .env file and add your credentials (refer .env.example).

### 4. Start the server
bash
npm start

Server will run on: http://localhost:5000

### 📮 API Endpoints

Auth Routes
| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| POST   | /api/signup | User Registration |
| POST   | /api/login  | User Login        |


### Book Routes
| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | /api/books        | Get all books       |
| GET    | /api/books/:id    | Get book by ID      |
| POST   | /api/books        | Add new book (auth) |
| GET    | /api/books/search | Search books        |


### Review Routes

| Method | Endpoint                      | Description          |
| ------ | ----------------------------- | -------------------- |
| POST   | /api/books/:id/reviews        | Add review (auth)    |
| PUT    | /api/books/reviews/:id        | Update review (auth) |
| DELETE | /api/books/reviews/delete/:id | Delete review (auth) |

### 📸 Sample Book Document

{
  "_id": "ObjectId",
  "title": "Harry Potter",
  "author": "J.K. Rowling",
  "genre": "Fantasy",
  "description": "A young wizard’s journey.",
  "reviews": [],
  "createdBy": "UserObjectId"
}

### 🧑‍💻 Author

Nikhil Shakya

GitHub: https://github.com/nikhilshakya07

LinkedIn: https://www.linkedin.com/in/nikhil-shakya07/

Built with ❤️ by Nikhil Shakya for Billeasy
