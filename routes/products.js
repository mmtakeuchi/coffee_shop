const express = require("express");
const router = express.Router();
const passport = require("passport");
const productsController = require("../controllers/productsController");
const { isAdmin } = require("../middleware/auth");

router.get("/test", (req, res) =>
  res.json({ msg: "This is the products route" })
);

router.get("/", productsController.get_products);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  productsController.add_product
);

router.get("/:id", productsController.show_product);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  productsController.update_product
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  productsController.delete_product
);

module.exports = router;
