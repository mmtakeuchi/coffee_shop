const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/usersController");

// GET USER
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  usersController.get_user
);

// REGISTER
router.post("/register", usersController.register);

// LOGIN
router.post("/login", usersController.login);

module.exports = router;
