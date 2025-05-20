const Book = require("../models/Book");
const Review = require("../models/Review");

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

    const totalBooks = await Book.countDocuments(filters);

    const books = await Book.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      books
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching books", error: err.message });
  }
};

// Get single book with reviews & avg rating (with pagination)
const getBookById = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;

    const book = await Book.findById(req.params.id).populate("createdBy", "name email"); // optional populate

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Total reviews count
    const totalReviews = await Review.countDocuments({ book: book._id });

    // Paginated reviews
    const reviews = await Review.find({ book: book._id })
      .populate("user", "name email") // optional populate
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // All ratings for avg
    const allRatings = await Review.find({ book: book._id }).select("rating");
    const ratingValues = allRatings.map((r) => r.rating);
    const averageRating = ratingValues.length
      ? (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(2)
      : null;

    // Response
    res.status(200).json({
      book,
      averageRating,
      totalReviews,
      currentPage: Number(page),
      totalPages: Math.ceil(totalReviews / limit),
      reviews,
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching book", error: err.message });
  }
};


// GET /search - Search books by title, author, or genre
const searchBooks = async (req, res) => {
  try {
    const { title, author, genre } = req.query;

    if (!title && !author && !genre) {
      return res.status(400).json({ message: "Please provide at least one search parameter (title, author, genre)" });
    }

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const query = {};

    if (title) query.title = new RegExp(escapeRegex(title), "i");
    if (author) query.author = new RegExp(escapeRegex(author), "i");
    if (genre) query.genre = new RegExp(escapeRegex(genre), "i");

    const books = await Book.find(query);
    res.status(200).json({ books, count: books.length });
  } catch (err) {
    res.status(500).json({ message: "Error searching books", error: err.message });
  }
};


module.exports = { addBook, getAllBooks, getBookById, searchBooks };
