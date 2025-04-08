const express = require("express");
const router = express.Router({ mergeParams: 1 });
const reviewController = require("../controllers/reviewController.js");
const { isloggedIn, validateReview, isReviewAuthor, saveRedirectUrl } = require("../middleware.js")


// review route 
// to add review route
router.post("/", saveRedirectUrl, isloggedIn, validateReview, reviewController.addreview)

// To Delete Review route
router.delete("/:reviewId", saveRedirectUrl, isloggedIn, isReviewAuthor, reviewController.destroyReview);

module.exports = router;