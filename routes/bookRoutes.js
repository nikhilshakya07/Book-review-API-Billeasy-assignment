const express = require("express");
const router = express.Router();
const { addBook, getAllBooks, getBookById, searchBooks } = require("../controllers/bookController");
const requireAuth = require("../middleware/authMiddleware");

router.post("/books", requireAuth, addBook);     // Add new book (auth only)
router.get("/books/search", searchBooks);        // Search books (public)
router.get("/books/:id", getBookById);           // Get book by ID (public)
router.get("/books", getAllBooks);               // Get all books (public)



module.exports = router;
