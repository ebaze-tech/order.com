const express = require("express");
const router = express.Router();
const AccountController = require("../../controllers/accounts/account");
const { authenticate, authorize } = require("passport");

router.post("/account/register", AccountController.register);
router.post("/account/login", AccountController.login, authenticate, authorize("User"));

module.exports = router;
