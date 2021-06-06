const express = require("express");
const router = express.Router();
const passport = require("passport");
const ordersController = require("../controllers/ordersController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ordersController.getOrder
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ordersController.checkout
);

// router.post("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "T-shirt",
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: "https://example.com/success",
//     cancel_url: "https://example.com/cancel",
//   });

//   res.json({ id: session.id });
// });

module.exports = router;
