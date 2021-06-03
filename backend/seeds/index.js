const mongoose = require("mongoose");
const products = require("./products");
const Product = require("../models/Product");

mongoose.connect("mongodb://localhost:27017/coffeeDB", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Product.deleteMany({});
  products.forEach((item) => {
    const product = new Product(item);
    product.save();
  });
};

seedDB().then(() => {
  mongoose.connection.close();
});
