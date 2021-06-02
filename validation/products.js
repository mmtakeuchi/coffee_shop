const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateProductInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : "";
  data.description = validText(data.description) ? data.description : "";
  data.category = validText(data.category) ? data.category : "";

  if (!Validator.isNumeric(data.price)) {
    errors.text = "Price must be a number";
  }

  if (!Validator.isNumeric(data.stock)) {
    errors.text = "Stock must be a number";
  }

  if (Validator.isEmpty(data.title)) {
    errors.text = "Title field is required";
  }

  if (Validator.isEmpty(data.price)) {
    errors.text = "Price field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.text = "Description field is required";
  }

  if (Validator.isEmpty(data.category)) {
    errors.text = "Category field is required";
  }

  if (Validator.isEmpty(data.stock)) {
    errors.text = "Stock field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
