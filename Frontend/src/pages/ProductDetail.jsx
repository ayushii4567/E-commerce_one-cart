import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from "../Component/RelatedProduct";
import Loading from "../Component/Loading";

function ProductDetail() {
  const { productId } = useParams();

  const { products, currency, addtocart, cartLoading } =
    useContext(shopDataContext);

  const [productData, setProductData] = useState(false);

  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [size, setSize] = useState("");

  // FETCH PRODUCT DATA
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);

        setImage1(item.image1);
        setImage2(item.image2);
        setImage3(item.image3);
        setImage4(item.image4);

        setImage(item.image1);

        return null;
      }

      return null;
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[110px] pb-[80px] overflow-x-hidden">
      {/* MAIN SECTION */}
      <div className="w-[92%] max-w-[1450px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-[60px]">
        {/* LEFT IMAGE SECTION */}
        <div className="lg:w-[52%] w-full flex flex-col lg:flex-row items-center justify-center gap-[25px]">
          {/* THUMBNAILS */}
          <div className="flex lg:flex-col flex-row gap-[18px] flex-wrap justify-center">
            <div className="w-[80px] h-[90px] md:w-[95px] md:h-[110px] border border-[#ffffff25] rounded-[10px] overflow-hidden bg-[#ffffff10] cursor-pointer">
              <img
                src={image1}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                onClick={() => setImage(image1)}
              />
            </div>

            <div className="w-[80px] h-[90px] md:w-[95px] md:h-[110px] border border-[#ffffff25] rounded-[10px] overflow-hidden bg-[#ffffff10] cursor-pointer">
              <img
                src={image2}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                onClick={() => setImage(image2)}
              />
            </div>

            <div className="w-[80px] h-[90px] md:w-[95px] md:h-[110px] border border-[#ffffff25] rounded-[10px] overflow-hidden bg-[#ffffff10] cursor-pointer">
              <img
                src={image3}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                onClick={() => setImage(image3)}
              />
            </div>

            <div className="w-[80px] h-[90px] md:w-[95px] md:h-[110px] border border-[#ffffff25] rounded-[10px] overflow-hidden bg-[#ffffff10] cursor-pointer">
              <img
                src={image4}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                onClick={() => setImage(image4)}
              />
            </div>
          </div>

          {/* MAIN IMAGE */}
          <div className="lg:w-[78%] w-full max-w-[650px] h-[500px] md:h-[650px] rounded-[18px] overflow-hidden border border-[#ffffff20] shadow-2xl shadow-black/40 bg-[#ffffff08]">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:w-[45%] w-full flex flex-col items-start gap-[22px] text-left">
          {/* TITLE */}
          <h1 className="text-[34px] md:text-[48px] font-semibold text-white leading-tight">
            {productData.name.toUpperCase()}
          </h1>

          {/* RATING */}
          <div className="flex items-center gap-1">
            <FaStar className="text-[22px] fill-[#FFD700]" />
            <FaStar className="text-[22px] fill-[#FFD700]" />
            <FaStar className="text-[22px] fill-[#FFD700]" />
            <FaStar className="text-[22px] fill-[#FFD700]" />
            <FaStarHalfAlt className="text-[22px] fill-[#FFD700]" />

            <p className="text-[18px] text-white ml-[8px]">(124 Reviews)</p>
          </div>

          {/* PRICE */}
          <p className="text-[34px] md:text-[40px] font-bold text-[#dff9ff]">
            {currency} {productData.price}
          </p>

          {/* DESCRIPTION */}
          <p className="w-full md:w-[90%] text-[16px] md:text-[19px] leading-[34px] text-[#e5e5e5]">
            {productData.description}
          </p>

          {/* SIZE */}
          <div className="flex flex-col gap-[15px] mt-[10px]">
            <p className="text-[24px] font-semibold text-white">Select Size</p>

            <div className="flex gap-[12px] flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-[24px] py-[12px] rounded-[10px] border transition-all duration-300 text-[16px]

                  ${
                    item === size
                      ? "bg-white text-black border-white"
                      : "bg-[#ffffff10] text-white border-[#ffffff25] hover:bg-white hover:text-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button
            disabled={!size || cartLoading}
            onClick={() => addtocart(productData._id, size)}
            className="
mt-[15px]
px-[40px]
py-[16px]
rounded-[14px]
font-semibold
text-[16px]
tracking-wide

bg-gradient-to-r from-[#e6fbff] to-[#bff3ff]
text-black

shadow-md shadow-black/20

transition-all duration-300 ease-out

hover:from-white
hover:to-[#d6f7ff]
hover:shadow-xl hover:shadow-[#56dbfc33]
hover:-translate-y-1 hover:scale-[1.04]

active:scale-[0.97]

disabled:opacity-50
disabled:cursor-not-allowed
disabled:white
"
          >
            {cartLoading ? <Loading /> : "Add To Cart"}
          </button>

          {/* LINE */}
          <div className="w-full h-[1px] bg-[#ffffff20] mt-[10px]"></div>

          {/* EXTRA INFO */}
          <div className="flex flex-col gap-[10px] text-[15px] md:text-[17px] text-[#d7d7d7] leading-[30px]">
            <p>✔ 100% Original Product.</p>

            <p>✔ Cash on delivery is available on this product.</p>

            <p>✔ Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="w-[92%] max-w-[1450px] mx-auto mt-[100px] flex flex-col gap-[25px]">
        {/* TABS */}
        <div className="flex items-center">
          <p className="px-[28px] py-[14px] border border-[#ffffff30] bg-[#ffffff10] text-white font-semibold rounded-tl-[10px] rounded-tr-[10px]">
            Description
          </p>

          <p className="px-[28px] py-[14px] border border-[#ffffff20] text-[#d6d6d6] rounded-tr-[10px]">
            Reviews (124)
          </p>
        </div>

        {/* CONTENT */}
        <div className="w-full bg-[#ffffff08] border border-[#ffffff15] rounded-[16px] p-[25px] md:p-[40px] text-[#ededed] text-[15px] md:text-[18px] leading-[36px]">
          <p>{productData.description}</p>

          <p className="mt-[20px]">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet.
            Customers can browse products, compare prices, place orders, and
            enjoy secure online payments with fast delivery.
          </p>
        </div>

        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default ProductDetail;
