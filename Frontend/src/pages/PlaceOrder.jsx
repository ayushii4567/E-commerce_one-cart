import React, { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import razorpay from "../assets/Razorpay.jpg";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);

  const { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

        const { data } = await axios.post(
          serverUrl + "/api/order/verifyrazorpay",
          response,
          { withCredentials: true },
        );

        if (data.success) {
          navigate("/order");
          setCartItem({});
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const itemId in cartItem) {
        for (const size in cartItem[itemId]) {
          if (cartItem[itemId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === itemId),
            );

            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItem[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      switch (method) {
        case "cod":
          const result = await axios.post(
            `${serverUrl}/api/order/placeorder`,
            orderData,
            { withCredentials: true },
          );

          console.log(result.data);

          if (result.data.success) {
            setCartItem({});
            navigate("/order");
          } else {
            console.log(result.data.message);
          }
          break;

        case "razorpay":
          const resultRazorpay = await axios.post(
            serverUrl + "/api/order/razorpay",
            orderData,
            { withCredentials: true },
          );

          if (resultRazorpay.data) {
            initPay(resultRazorpay.data);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative">
      {/* LEFT SIDE */}
      <div className="lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]">
        <form
          onSubmit={onSubmitHandler}
          className="lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]"
        >
          <div className="py-[10px]">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] gap-2">
            <input
              type="text"
              placeholder="First name"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] text-white"
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
            />

            <input
              type="text"
              placeholder="Last name"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] text-white"
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
            />
          </div>

          <div className="w-[100%] h-[70px] px-[10px]">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] text-white"
              required
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
            />
          </div>

          <div className="w-[100%] h-[70px] px-[10px]">
            <input
              type="text"
              placeholder="Street"
              className="w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] text-white"
              required
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
            />
          </div>

          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] gap-2">
            <input
              type="text"
              placeholder="City"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] text-white"
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
            />

            <input
              type="text"
              placeholder="State"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] text-white"
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
            />
          </div>

          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] gap-2">
            <input
              type="text"
              placeholder="Pincode"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] text-white"
              required
              onChange={onChangeHandler}
              name="pinCode"
              value={formData.pinCode}
            />

            <input
              type="text"
              placeholder="Country"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] text-white"
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
            />
          </div>

          <div className="w-[100%] h-[70px] px-[10px]">
            <input
              type="text"
              placeholder="Phone"
              className="w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] text-white"
              required
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
            />
          </div>

          <div className="px-[10px] mt-[20px]">
            <button
              type="submit"
              className="text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white border border-[#80808049]"
            >
              PLACE ORDER
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px]">
        <div className="lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col">
          <CartTotal />

          <div className="py-[10px]">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>

          <div className="w-[100%] h-[30vh] lg:h-[100px] flex items-start lg:items-center mt-[20px] lg:mt-[0px] justify-center gap-[50px]">
            <button
              type="button"
              onClick={() => setMethod("razorpay")}
              className={`w-[150px] h-[50px] rounded-sm ${
                method === "razorpay" ? "border-[5px] border-blue-900" : ""
              }`}
            >
              <img
                src={razorpay}
                className="w-full h-full object-fill rounded-sm"
                alt="Razorpay"
              />
            </button>

            <button
              type="button"
              onClick={() => setMethod("cod")}
              className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-white text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${
                method === "cod" ? "border-[5px] border-blue-900" : ""
              }`}
            >
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
