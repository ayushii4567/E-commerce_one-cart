import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Nav from "./Component/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { userDataContext } from "./context/userContext";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";
import Ai from "./Component/Ai";


function App() {
  let { userData } = useContext(userDataContext);
  let location = useLocation();

  return (
    <>
      {location.pathname !== "/login" &&
 location.pathname !== "/signup" && <Nav />}
      <Routes>
        <Route
          path="/login"
          element={
            userData ? <Navigate to={location.state?.from || "/"} /> : <Login />
          }
        />

        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Registration />
            )
          }
        />

        <Route path="/" element={<Home />} />

       <Route path="/about" element={<About />} />

        <Route path="/collections" element={<Collections />} />

        <Route
          path="/product"
          element={
            userData ? (
              <Product />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

       <Route path="/contact" element={<Contact />} />

       <Route
  path="/productdetail/:productId"
  element={<ProductDetail />}
/>

        <Route path="/cart" element={<Cart />} />
        <Route
          path="/placeorder"
          element={
            userData ? (
              <PlaceOrder />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/order"
          element={
            userData ? (
              <Order/>
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="*"
          element={
           <NotFound/>
          }
        />
      
      </Routes>

          {location.pathname !== "/login" &&
       location.pathname !== "/signup" && <Ai />}




    </>
  );
}

export default App;
