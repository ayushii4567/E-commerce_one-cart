import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/vcart logo.png";
import {
  IoSearchOutline,
  IoSearchCircleOutline,
  IoSearchCircleSharp,
} from "react-icons/io5"; // Naye icons add kiye
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6"; // Profile icon ke liye
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { userDataContext } from "../context/userContext";
import { authDataContext } from "../context/authContext";
import { shopDataContext } from "../context/ShopContext";
import { toast } from "react-toastify";

function Nav() {
  const { userData, getCurrentUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);

  const { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      toast.success("Logout Successful 👋", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });

      getCurrentUser();

      setShowProfile(false);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(error);

      toast.error("Logout Failed ❌", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  const navItems = [
    { label: "HOME", path: "/" },
    { label: "COLLECTIONS", path: "/collections" },
    { label: "ABOUT", path: "/about" },
    { label: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 z-50 w-full h-[86px]
  bg-[#edf4f4] border-b border-black/10
  flex flex-col justify-start px-6 lg:px-10 shadow-sm"
      >
        {/* 🔹 TOP NAV */}
        <div className="flex items-center justify-between h-[86px]">
          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={logo}
              alt="logo"
              className="w-11 h-11 transition duration-300 group-hover:rotate-6 group-hover:scale-110"
            />
            <h1 className="text-[28px] font-semibold text-[#202020] tracking-wide">
              OneCart
            </h1>
          </div>

          {/* MENU */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`px-8 py-3 rounded-[20px] text-[14px] tracking-wide font-medium transition-all duration-300 border border-transparent hover:-translate-y-1 hover:scale-105 hover:shadow-xl ${
                    active
                      ? "bg-[#1f1f1f] text-white shadow-lg border-white/20"
                      : "bg-[#2e2e2e] text-white hover:bg-black"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="w-[30%] flex items-center justify-end gap-[20px]">
            {/* SEARCH BUTTON */}
            <button
              onClick={() => {
                setShowSearch(!showSearch);
                setShowProfile(false);
              }}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                showSearch
                  ? "bg-black text-white"
                  : "text-black hover:bg-black hover:text-white"
              }`}
            >
              <IoSearchOutline className="text-[28px]" />
            </button>

            <div ref={profileRef} className="relative">
              <button
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowSearch(false);
                }}
                className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold transition-all duration-300 hover:scale-110 ${
                  showProfile
                    ? "bg-black text-white"
                    : "bg-[#2b2b2b] text-white hover:bg-black"
                }`}
              >
                {userData?.name
   ? userData.name.charAt(0).toUpperCase()
   : <FaCircleUser className="text-[22px]" />
}
              </button>

              {showProfile && (
                <div className="absolute right-0 top-[60px] w-[220px] bg-[#101010] rounded-3xl p-3 shadow-2xl border border-white/10 overflow-hidden animate-[fadeIn_.3s_ease]">
                  <div className="px-4 py-3 border-b border-white/10 text-white">
                    <p className="font-semibold text-[15px]">
                      {userData?.name || "Account"}
                    </p>
                    <p className="text-[12px] text-gray-400 mt-1">
                      Manage your profile
                    </p>
                  </div>

                  <div className="flex flex-col mt-2 text-[14px]">
                    <button
                      onClick={() => navigate("/order")}
                      className="text-left px-4 py-3 text-white rounded-2xl transition hover:bg-white hover:text-black"
                    >
                      Orders
                    </button>

                    <button
                      onClick={() => navigate("/about")}
                      className="text-left px-4 py-3 text-white rounded-2xl transition hover:bg-white hover:text-black"
                    >
                      About
                    </button>

                    {userData ? (
                      <button
                        onClick={handleLogout}
                        className="text-left px-4 py-3 text-[#ff6b6b] rounded-2xl transition hover:bg-[#ff6b6b] hover:text-white"
                      >
                        Logout
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/login")}
                        className="text-left px-4 py-3 text-white rounded-2xl transition hover:bg-white hover:text-black"
                      >
                        Login
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* CART */}
            <button
              onClick={() => navigate("/cart")}
              className="relative w-11 h-11 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white hover:scale-110 transition-all duration-300"
            >
              <MdOutlineShoppingCart className="text-[30px]" />

              {/* CART COUNT LOGIC - Updated for RED Circle and Larger Size */}
              <p className="absolute w-[22px] h-[22px] flex items-center justify-center bg-red-600 text-white font-bold rounded-full text-[12px] top-[4px] right-[-5px] shadow-md">
                {getCartCount()}
              </p>
            </button>
          </div>
        </div>

        {/* 🔍 SEARCH BAR (NO GAP VERSION) */}
        <div
          className={`absolute top-[86px] left-0 w-full

  bg-[#dff7fb]/70
  backdrop-blur-md

  overflow-hidden
  transition-all duration-300 ease-in-out

  ${showSearch ? "max-h-[120px] py-5 opacity-100" : "max-h-0 py-0 opacity-0"}

  flex items-center justify-center

  border-b border-white/20
  shadow-md`}
        >
          <input
            autoFocus
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              // user agar collections page pe nahi hai toh redirect
              if (location.pathname !== "/collections") {
                navigate("/collections");
              }
            }}
            type="text"
            placeholder="What are you looking for?"
            className="
    w-[50%]
    h-[50px]
    bg-[#1c3438]/95
    text-white
    text-[17px]
    px-10
    rounded-full
    outline-none
    placeholder:text-[#d7d7d7]
    shadow-lg
    transition-all duration-300
    focus:w-[55%]
  "
          />
        </div>
      </nav>
    </>
  );
}

export default Nav;
