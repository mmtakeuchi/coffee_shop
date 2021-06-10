const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  imageController.uploadImage
);

module.exports = router;
