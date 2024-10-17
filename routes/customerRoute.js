const express = require("express");
const router = express.Router();

const { customerController } = require("../controllers");

router.get("/", customerController.showCustomerPage);
router.get("/create", customerController.createCustomerPage);

module.exports = router;
