import React, { useContext, useEffect, useState } from "react";
import Title from "../Component/Title";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { userDataContext } from "../context/userContext";

import CartTotal from "../component/CartTotal";

function Cart() {
  const { products, currency, cartItem, updateQuantity } =
    useContext(shopDataContext);
  const { userData } = useContext(userDataContext);
  const [cartData, setCartData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]">
      <div className="h-[8%] w-[100%] text-center mt-[80px]">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="w-[100%] h-[92%] flex flex-wrap gap-[20px] mt-10">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id,
          );

          return (
            <div key={index} className="w-[100%] h-auto border-t border-b py-4">
              <div className="w-[100%] flex items-start gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative shadow-lg">
                {/* Product Image */}
                <img
                  className="w-[100px] h-[100px] rounded-md object-cover"
                  src={productData.image1}
                  alt={productData.name}
                />

                {/* Product Details */}
                <div className="flex flex-col gap-[10px] items-start justify-center">
                  <p className="md:text-[25px] text-[20px] font-medium text-[#f3f9fc]">
                    {productData.name}
                  </p>

                  <div className="flex items-center gap-[20px]">
                    <p className="text-[20px] text-[#aaf4e7]">
                      {currency} {productData.price}
                    </p>
                    <p className="w-[40px] h-[40px] text-[16px] text-white bg-[#518080b4] rounded-md flex items-center justify-center border border-[#9ff9f9]">
                      {item.size}
                    </p>
                  </div>
                </div>

                {/* Quantity Input */}
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value),
                        )
                  }
                  className="md:max-w-20 max-w-10 md:px-2 md:py-2 py-[5px] px-[10px] text-white text-[18px] font-semibold bg-[#518080b4] absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border border-[#9ff9f9] rounded-md"
                />

                {/* Delete Button */}
                <RiDeleteBin6Line
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="text-[#9ff9f9] w-[25px] h-[25px] absolute top-[50%] md:top-[40%] md:right-[5%] right-4 cursor-pointer hover:text-red-500 transition-colors"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* --- CART TOTALS & CHECKOUT SECTION --- */}
      <div className="flex justify-start items-end my-20">
        <div className="w-full sm:w-[450px]">
          {/* Cart Total Component */}
          <CartTotal />

          {/* Proceed to Checkout Button */}
          <button
            onClick={() => {
              if (cartData.length === 0) {
                console.log("Your cart is empty!");
                return;
              }

              // USER LOGIN NAHI HAI
              if (!userData) {
                navigate("/login", {
                  state: { from: "/placeorder" },
                });

                return;
              }

              // LOGIN HAI
              navigate("/placeorder");
            }}
            className="text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] ml-[30px] mt-[20px] transition-all duration-300"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
