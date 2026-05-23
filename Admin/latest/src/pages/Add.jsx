import React, { useContext } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import upload from "../assets/upload_image.jpg";
import { useState } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function Add() {
  let [image1, setImage1] = useState(false);
  let [image2, setImage2] = useState(false);
  let [image3, setImage3] = useState(false);
  let [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  let { serverUrl } = useContext(authDataContext);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      let result = await axios.post(
        serverUrl + "/api/product/addproduct",
        formData,
        { withCredentials: true },
      );

      console.log(result.data);

      toast.success("ADD Product Successfully");

      if (result.data.success) {
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("TopWear");
        setSizes([]);
      }
    } catch (error) {
      console.log(error);

      toast.error("ADD Product Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative">
      <Nav />
      <Sidebar />

      <div className="w-[82%] h-full flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[5%]">
        <form
          onSubmit={handleAddProduct}
          className="w-full md:w-[90%] h-full mt-[70px] flex flex-col gap-[30px] py-[90px] px-[30px] md:px-[60px]"
        >
          <div className="w-[400px] h-[50px] text-[25px] md:text-[40px] text-white">
            Add Product Page
          </div>

          {/* Image Upload Section */}
          <div className="w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Upload Images
            </p>
            <div className="w-full flex items-center justify-start gap-4">
              {[setImage1, setImage2, setImage3, setImage4].map(
                (setImg, index) => {
                  const imgState = [image1, image2, image3, image4][index];
                  return (
                    <label
                      key={index}
                      htmlFor={`image${index + 1}`}
                      className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer"
                    >
                      <img
                        src={!imgState ? upload : URL.createObjectURL(imgState)}
                        alt=""
                        className="w-full h-full rounded-lg shadow-2xl border-[2px] border-transparent hover:border-[#46d1f7] object-cover"
                      />
                      <input
                        type="file"
                        id={`image${index + 1}`}
                        hidden
                        onChange={(e) => setImg(e.target.files[0])}
                      />
                    </label>
                  );
                },
              )}
            </div>
          </div>

          {/* Product Name */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Name
            </p>
            <input
              type="text"
              placeholder="Type here"
              className="w-[600px] max-w-[98%] h-[40px] rounded-lg bg-slate-600 px-[20px] border-[2px] border-transparent hover:border-[#46d1f7] outline-none"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          {/* Product Description */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Description
            </p>
            <textarea
              placeholder="Type here"
              className="w-[600px] max-w-[98%] h-[100px] rounded-lg bg-slate-600 px-[20px] py-[10px] border-[2px] border-transparent hover:border-[#46d1f7] outline-none"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>

          {/* Category Selection */}
          <div className="w-[80%] flex items-center gap-[20px] flex-wrap">
            <div className="flex flex-col gap-[10px]">
              <p className="text-[20px] md:text-[25px] font-semibold">
                Product Category
              </p>
              <select
                className="bg-slate-600 px-4 py-2 rounded-lg border-[2px] border-transparent hover:border-[#46d1f7] outline-none"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="flex flex-col gap-[10px]">
              <p className="text-[20px] md:text-[25px] font-semibold">
                Sub-Category
              </p>
              <select
                className="bg-slate-600 px-4 py-2 rounded-lg border-[2px] border-transparent hover:border-[#46d1f7] outline-none"
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          {/* Product Price */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Price
            </p>
            <input
              type="number"
              placeholder="₹ 2000"
              className="w-[200px] h-[40px] rounded-lg bg-slate-600 px-[20px] outline-none border-[2px] border-transparent hover:border-[#46d1f7]"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          {/* Product Sizes */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Size
            </p>
            <div className="flex gap-3 flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size],
                    )
                  }
                  className={`px-4 py-2 rounded-lg cursor-pointer border-[2px] transition-all ${sizes.includes(size) ? "bg-green-400 text-black border-[#46d1f7]" : "bg-slate-600 text-white border-transparent"}`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="checkbox"
              className="w-5 h-5 cursor-pointer"
              checked={bestseller}
              onChange={() => setBestSeller((prev) => !prev)}
            />
            <label
              htmlFor="checkbox"
              className="text-[18px] md:text-[22px] font-semibold cursor-pointer"
            >
              Add to BestSeller
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-[160px] py-3 rounded-xl bg-[#65d8f7] text-black font-bold text-lg transition-all flex items-center justify-center"
          >
            {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
