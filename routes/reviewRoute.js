const express = require("express");
const router = express.Router();

const { reviewController } = require("../controllers");

router.get("/reviews", reviewController.showReviewPage);

module.exports = router;