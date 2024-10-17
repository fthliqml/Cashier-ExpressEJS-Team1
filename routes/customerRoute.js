const express = require("express");
const router = express.Router();

const { customerController } = require("../controllers");

router.get("/", customerController.showCustomerPage);

module.exports = router;
