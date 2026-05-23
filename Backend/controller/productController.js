import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
  try {
    let { name, description, price, category, subcategory, sizes, bestseller } =
      req.body;

    console.log(req.files);

    // Safe image extraction
    const image1File = req.files?.image1?.[0];
    const image2File = req.files?.image2?.[0];
    const image3File = req.files?.image3?.[0];
    const image4File = req.files?.image4?.[0];

    // Upload images
    const image1 = image1File ? await uploadOnCloudinary(image1File.path) : "";

    const image2 = image2File ? await uploadOnCloudinary(image2File.path) : "";

    const image3 = image3File ? await uploadOnCloudinary(image3File.path) : "";

    const image4 = image4File ? await uploadOnCloudinary(image4File.path) : "";

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

    const product = await Product.create(productData);

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("FULL ERROR => ", error);

    console.log("MESSAGE => ", error.message);

    console.log("STACK => ", error.stack);

    console.log("MONGO ERRORS => ", error.errors);

    return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const listProduct = async (req, res) => {
  try {

    const product = await Product.find({})

    return res.status(200).json({
      success:true,
      product
    })

  } catch (error) {

    console.log("ListProduct error", error)

    return res.status(500).json({
      success:false,
      message:`ListProduct error ${error.message}`
    })
  }
}

export const removeProduct = async (req, res) => {
  try {

    let {id} = req.params;
    const product = await Product.findByIdAndDelete(id)


   return res.status(200).json({
   success:true,
   product
});
  } catch (error) {
    console.log("ListProduct error");
    return res.status(500).json({
      message: `ListProduct error $ {error}`,
    });
  }
};
