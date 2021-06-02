const Product = require("../models/Product");
const validateProductInput = require("../validation/products");

module.exports.get_products = (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then((products) => res.json(products));
};

module.exports.add_product = (req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateProductInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  console.log(req.body);
  const newProduct = new Product(req.body);
  newProduct.save().then((product) => res.json(product));
};

module.exports.update_product = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    { id: req.params.id },
    req.body
  );

  Product.findOne({ id: req.params.id }).then((product) => res.json(product));
};

module.exports.delete_product = (req, res) => {
  Product.findByIdAndDelete({ id: req.params.id }).then((product) =>
    res.json({ success: true })
  );
};
