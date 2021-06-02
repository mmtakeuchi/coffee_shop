const Product = require("../models/Product");

module.exports.get_products = (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then((products) => res.json(products));
};

module.exports.add_product = (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save().then((product) => res.json(product));
};

module.exports.update_product = (req, res) => {
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
