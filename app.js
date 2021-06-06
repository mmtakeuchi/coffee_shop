const port = process.env.PORT || 5000;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");

const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/carts");
const orderRoutes = require("./routes/orders");

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./config/passport")(passport);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("frontend/build"));
//   app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// }

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
