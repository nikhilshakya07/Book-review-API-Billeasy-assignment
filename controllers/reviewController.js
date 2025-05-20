const Review = require("../models/Review");
const Book = require("../models/Book");

// POST /books/:id/reviews - Add review
const addReview = async (req, res) => {
    
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;
    const userId = req.user._id;

    // Check if review already exists by this user
    const existing = await Review.findOne({ book: bookId, user: userId });
    if (existing) {
      return res.status(400).json({ message: "You already reviewed this book." });
    }
    //create and save review
    const review = new Review({
      book: bookId,
      user: userId,
      rating,
      comment
    });

    await review.save();
    await Book.findByIdAndUpdate(bookId, {
      $push: { reviews: review._id },
    });
    
    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    res.status(500).json({ message: "Error adding review", error: err.message });
  }
};

// PUT /reviews/:id - Update review
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }
    if (!review.user){
        return res.status(500).json({message : "Review has no user associated"});
    }
    
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only update your own review" });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    res.status(200).json({ message: "Review updated", review });
  } catch (err) {
    res.status(500).json({ message: "Error updating review", error: err.message });
  }
};

// DELETE /reviews/:id - Delete review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own review" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review", error: err.message });
  }
};

module.exports = { addReview, updateReview, deleteReview };
