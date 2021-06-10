const { uploadImage } = require("../frontend/src/actions/imageActions");
const Product = require("../models/Product");
const validateProductInput = require("../validation/products");
const { cloudinary } = require("../cloudinary/index");

module.exports.getProducts = (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then((products) => res.json(products));
};

module.exports.addProduct = async (req, res) => {
  console.log(req.body);
  const { resources } = await cloudinary.search
    .expression("folder:coffeeMERN")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  console.log(publicIds);

  const product = new Product(req.body);
  product.images = publicIds[0];
  console.log(product);

  const newProduct = await product.save();

  if (newProduct) {
    return res.json(newProduct);
  }
  return res.status(500).send({ message: " Error in Creating Product." });
};

module.exports.showProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
};

module.exports.updateProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);
  const updatedProduct = await product.save();
  console.log(product);

  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(500).send({ message: " Error in Updating Product." });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);

  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
};
