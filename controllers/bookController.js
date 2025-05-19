const Book = require("../models/Book");

// Add a new book (Authenticated)
const addBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;

    const book = new Book({
      title,
      author,
      genre,
      description,
      createdBy: req.user._id
    });

    await book.save();

    res.status(201).json({ message: "Book added successfully", book });
  } catch (err) {
    res.status(500).json({ message: "Error adding book", error: err.message });
  }
};


// Get all books with pagination and filter
const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    const filters = {};
    if (author) filters.author = new RegExp(author, "i");
    if (genre) filters.genre = new RegExp(genre, "i");

    const books = await Book.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({ books });
  } catch (err) {
    res.status(500).json({ message: "Error fetching books", error: err.message });
  }
};

// Get single book with reviews & avg rating
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("reviews");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const ratings = book.reviews.map((rev) => rev.rating);
    const averageRating = ratings.length
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
      : null;

    res.status(200).json({ book, averageRating });
  } catch (err) {
    res.status(500).json({ message: "Error fetching book", error: err.message });
  }
};

// GET /search - Search books by title, author, or genre
const searchBooks = async (req, res) => {
  try {
    const { title, author, genre } = req.query;

    const query = {};
    if (title) query.title = new RegExp(title, "i");
    if (author) query.author = new RegExp(author, "i");
    if (genre) query.genre = new RegExp(genre, "i");

    const books = await Book.find(query);
    res.status(200).json({ books });
  } catch (err) {
    res.status(500).json({ message: "Error searching books", error: err.message });
  }
};

module.exports = { addBook, getAllBooks, getBookById, searchBooks };
