const { cloudinary } = require("../cloudinary/index");
const Product = require("../models/Product");

module.exports.uploadImage = async (req, res) => {
  try {
    const fileStr = req.body.data;

    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "x4argbkt",
    });
    console.log(uploadedResponse);
    res.json({ message: "Success", image: uploadedResponse.public_id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error uploading image." });
  }
};
