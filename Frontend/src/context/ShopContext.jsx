import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { authDataContext } from "./authContext";
import { userDataContext } from "./userContext";

export const shopDataContext = createContext();

function ShopContext({ children }) {

  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState("");
  let [showSearch, setShowSearch] = useState(false);
  let [cartItem, setCartItem] = useState({});
  const [cartLoading, setCartLoading] = useState(false);

  let { serverUrl } = useContext(authDataContext);
  let { userData } = useContext(userDataContext);

  let currency = "₹";
  let delivery_fee = 40;

  // GET PRODUCTS
  const getProducts = async () => {
    try {

      let result = await axios.get(
        serverUrl + "/api/product/list"
      );

      console.log(result.data.product);

      setProducts(result.data.product);

    } catch (error) {

      console.log(error);

    }
  };

  // ADD TO CART
  const addtocart = async (itemId, size) => {

    // SIZE CHECK
    if (!size) {

      toast.error("Please Select Product Size");

      return;

    }

    try {

      setCartLoading(true);

      // LOCAL CART UPDATE
      let cartData = structuredClone(cartItem);

      if (cartData[itemId]) {

        if (cartData[itemId][size]) {

          cartData[itemId][size] += 1;

        } else {

          cartData[itemId][size] = 1;

        }

      } else {

        cartData[itemId] = {};
        cartData[itemId][size] = 1;

      }

      setCartItem(cartData);

      // DATABASE CART UPDATE
      if (userData) {

        let result = await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        );

        console.log(result.data);

        toast.success(
          result.data.message || "Added To Cart 🛒",
          {
            toastId: "add-cart"
          }
        );

      } else {

        toast.success(
          "Added To Cart 🛒",
          {
            toastId: "add-cart"
          }
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed To Add Cart"
      );

    } finally {

      setCartLoading(false);

    }
  };

  // GET USER CART
  const getUserCart = async () => {

    try {

      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {},
        { withCredentials: true }
      );

      setCartItem(result.data);

    } catch (error) {
  if (error.response?.status !== 401) {
    console.log(error);
  }
}
};

  // UPDATE QUANTITY
  const updateQuantity = async (itemId, size, quantity) => {

    try {

      let cartData = structuredClone(cartItem || {});

      if (!cartData[itemId]) {

        cartData[itemId] = {};

      }

      cartData[itemId][size] = quantity;

      const { data } = await axios.post(
        serverUrl + "/api/cart/update",
        { itemId, size, quantity },
        { withCredentials: true }
      );

      console.log(data);

      setCartItem(cartData);

      return data;

    } catch (error) {

      console.log(error);

      toast.error(error.message);

    }
  };

  // GET TOTAL CART COUNT
  const getCartCount = () => {

    let totalCount = 0;

    for (const items in cartItem) {

      for (const item in cartItem[items]) {

        try {

          if (cartItem[items][item] > 0) {

            totalCount += cartItem[items][item];

          }

        } catch (error) {

          console.log(error);

        }
      }
    }

    console.log("Total Cart Count:", totalCount);

    return totalCount;
  };

  // GET TOTAL AMOUNT
  const getCartAmount = () => {

    let totalAmount = 0;

    for (const productId in cartItem) {

      const productInfo = products.find(
        (product) => product._id === productId
      );

      if (!productInfo) continue;

      for (const size in cartItem[productId]) {

        const quantity = cartItem[productId][size];

        if (quantity > 0) {

          totalAmount += productInfo.price * quantity;

        }
      }
    }

    return totalAmount;
  };

  // LOAD PRODUCTS
  useEffect(() => {

    getProducts();

  }, []);

  // LOAD USER CART
  useEffect(() => {

    getUserCart();

  }, []);

  // CONTEXT VALUE
  let value = {

    products,
    currency,
    delivery_fee,
    getProducts,

    search,
    setSearch,
    showSearch,
    setShowSearch,

    cartItem,
    setCartItem,

    addtocart,
    getCartCount,

    cartLoading,

    updateQuantity,
    getCartAmount,

  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;