const dashboardRoute = require("./dashboardRoute.js");
const productRoute = require("./productRoute.js");

const express = require("express");
const router = express.Router();

router.use(dashboardRoute);
router.use(productRoute);

module.exports = router;
