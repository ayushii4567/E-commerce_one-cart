import React, { useContext, useState } from "react";
import logo from "../assets/vcart logo.png";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let { serverUrl } = useContext(authDataContext);
  let { adminData, getAdmin } = useContext(adminDataContext);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const AdminLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/adminlogin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log(result.data);

      toast.success("Admin Login Successfully");

      getAdmin();

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Admin Login Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      <div className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer">
        <img className="w-[40px]" src={logo} alt="Logo" />
        <h1 className="text-[22px] font-sans">OneCart</h1>
      </div>

      <div className="w-full h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px]">
          Welcome to OneCart, Apply to Admin Login
        </span>
      </div>

      <div className="max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          action=""
          onSubmit={AdminLogin}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >
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
                className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] pr-[50px] font-semibold"
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

            <button
              type="submit"
              disabled={loading}
              className={`
    w-full py-3 rounded-xl
    flex items-center justify-center gap-3

    text-white text-[18px] font-semibold tracking-wide

    bg-gradient-to-r from-blue-600 to-cyan-500

    shadow-lg shadow-blue-900/40

    transition-all duration-300 ease-in-out

    ${
      loading
        ? "opacity-70 cursor-not-allowed"
        : "hover:from-blue-500 hover:to-cyan-400 hover:shadow-cyan-500/40 hover:-translate-y-1 active:scale-[0.98]"
    }
  `}
            >
              {loading ? <Loading /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
