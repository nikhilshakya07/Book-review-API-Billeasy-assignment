const express = require("express");
const router = express.Router();
const { addReview, updateReview, deleteReview } = require("../controllers/reviewController");
const requireAuth = require("../middleware/authMiddleware");

router.post("/books/:id/reviews", requireAuth, addReview);
router.put("/books/reviews/:id", requireAuth, updateReview);
router.delete("/books/reviews/delete/:id", requireAuth, deleteReview);

module.exports = router;
