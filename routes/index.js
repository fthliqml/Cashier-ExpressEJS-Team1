const dashboardRoute = require("./dashboardRoute.js");
const productRoute = require("./productRoute.js");
const reviewRoute = require("./reviewRoute.js");

const express = require("express");
const router = express.Router();

router.use(dashboardRoute);
router.use(productRoute);
router.use(reviewRoute);

module.exports = router;
