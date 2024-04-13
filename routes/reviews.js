const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilities/catchAsync");
const review = require("../controllers/reviews.js");

const ExpressError = require("../utilities/ExpressError");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

router.post("/", isLoggedIn, validateReview, catchAsync(review.showReviews));
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(review.deleteReview)
);

module.exports = router;
