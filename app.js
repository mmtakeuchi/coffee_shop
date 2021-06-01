const port = process.env.PORT || 5000;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/users");

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", users);
