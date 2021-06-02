const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const keys = require("../config/keys");

cloudinary.config({
  cloud_name: keys.CLOUDINARY_CLOUD_NAME,
  api_key: keys.CLOUDINARY_KEY,
  api_secret: keys.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "YelpGolf",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
