import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/authContext.jsx";
import UserContext from "./context/userContext.jsx";
import ShopContext from "./context/ShopContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
        <ShopContext>
            <App />
        </ShopContext>
         <ToastContainer />
        
      </UserContext>
    </AuthContext>
  </BrowserRouter>
);