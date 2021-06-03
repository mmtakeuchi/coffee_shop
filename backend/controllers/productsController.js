const Product = require("../models/Product");
const validateProductInput = require("../validation/products");

module.exports.get_products = (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then((products) => res.json(products));
};

module.exports.add_product = async (req, res) => {
  const { errors, isValid } = validateProductInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const product = new Product(req.body);
  const newProduct = await product.save();

  if (newProduct) {
    return res
      .status(201)
      .send({ message: "New Product Created", data: newProduct });
  }
  return res.status(500).send({ message: " Error in Creating Product." });
};

module.exports.show_product = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
};

module.exports.update_product = async (req, res) => {
  console.log(req.body);
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);

  const updatedProduct = await product.save();

  if (updatedProduct) {
    res.status(200).send({ message: "Product Updated", data: updatedProduct });
  } else {
    res.status(500).send({ message: " Error in Updating Product." });
  }
};

module.exports.delete_product = async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);

  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
};
