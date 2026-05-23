import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/vcart logo.png";
import google from "../assets/google.png";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from "../context/AuthContext"; // adjust path if needed
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { userDataContext } from "../context/userContext.jsx";
import { toast } from "react-toastify";

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  

  const { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);
const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      toast.success("Login Successful 🎉", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });

      await getCurrentUser();

      setTimeout(() => {
        const redirectPath = location.state?.from || "/";

navigate(redirectPath);
      }, 1500);
    } catch (error) {
      setError("Invalid Email or Password ❌");

      toast.error("Login Failed", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  const googlelogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      console.log("Firebase user:", response.user);

      const { displayName: name, email } = response.user;

      const result = await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name, email },
        { withCredentials: true },
      );

      console.log("Backend response:", result.data);

      toast.success("Google Login Successful 🎉", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });

      await getCurrentUser();

      setTimeout(() => {
        const redirectPath = location.state?.from || "/";

navigate(redirectPath);
      }, 1500);
    } catch (error) {
      console.log("Google login error:", error.response?.data || error.message);

      toast.error("Google Login Failed ❌", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

    return (
      <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
        <div
          className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img className="w-[40px]" src={Logo} alt="Logo" />
          <h1 className="text-[22px] font-sans">OneCart</h1>
        </div>

        <div className="w-full h-[100px] flex items-center justify-center flex-col gap-[10px]">
          <span className="text-[25px] font-semibold">Login Page</span>
          <span className="text-[16px]">
            Welcome back to OneCart, place your order
          </span>
        </div>

        <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
          <form
            onSubmit={handleLogin}
            className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
          >
            <div
              className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer"
              onClick={googlelogin}
            >
              <img src={google} alt="Google" className="w-[20px]" />
              Login account with Google
            </div>

            <div className="w-full h-[20px] flex items-center justify-center gap-[10px]">
              <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
              OR
              <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            </div>

            <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative">
              <input
                type="email"
                className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <div className="w-full relative">
                <input
                  type={show ? "text" : "password"}
                  className={`w-full h-[50px] border-2 
         ${error ? "border-red-500" : "border-[#96969635]"}
        backdrop-blur-sm rounded-lg shadow-lg bg-transparent 
       placeholder-[#ffffffc7] px-[20px] pr-[50px] font-semibold`}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                {show ? (
                  <IoEye
                    className="w-[20px] h-[20px] cursor-pointer absolute right-[20px] top-1/2 -translate-y-1/2"
                    onClick={() => setShow(false)}
                  />
                ) : (
                  <IoEyeOutline
                    className="w-[20px] h-[20px] cursor-pointer absolute right-[20px] top-1/2 -translate-y-1/2"
                    onClick={() => setShow(true)}
                  />
                )}
              </div>

              {error && (
                <p className="text-red-400 text-[14px] w-full pl-2 font-medium">
                  {error}
                </p>
              )}

              <button className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">
                Login
              </button>

              <p className="flex gap-[10px] text-sm">
                You don't have an account?
                <span
                  className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Create New Account
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };


export default Login;
