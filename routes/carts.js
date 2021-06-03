const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers");
const router = Router();

router.get("/cart/:id", cartController.getCartItems);
router.post("/cart/:id", cartController.addCartItem);
router.delete("/cart/:userId/:itemId", cartController.deleteItem);

module.exports = router;
