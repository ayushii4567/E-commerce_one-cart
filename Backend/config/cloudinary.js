import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});






const uploadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) {
      return null;
    }

    const uploadResult = await cloudinary.uploader.upload(filepath);

    fs.unlinkSync(filepath);

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);

    if (filepath && fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    return null;
  }
};

export default uploadOnCloudinary;
