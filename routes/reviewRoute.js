const express = require("express");
const router = express.Router();

const { reviewController } = require("../controllers");

router.get("/reviews", reviewController.showReviewPage);
router.get("/reviews/chooseOrder", reviewController.chooseOrderReviewPage);
router.post("/reviews/chooseOrder", reviewController.createReviewPage);
router.post("/reviews/create", reviewController.createReview);
router.post("/reviews/delete/:id", reviewController.deleteReview);

// router.get("/reviews/:id", reviewController.showReviewPage);

module.exports = router;
