import React from "react";
import logo from "../assets/vcart logo.png";

function Footer() {
  return (
    <footer className="w-full bg-[#dbfcfcec] ">

      {/* Main Footer */}
      <div className="w-full flex flex-col md:flex-row justify-between gap-10 px-6 md:px-16 py-10">

        {/* LEFT */}
        <div className="md:w-[35%] flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-semibold text-black">
              OneCart
            </h1>
          </div>

          <p className="hidden md:block text-[15px] text-[#1e2223] leading-6">
            OneCart is your all-in-one online shopping destination,
            offering top-quality products, unbeatable deals, and fast
            delivery—all backed by trusted service designed to make your
            life easier everyday.
          </p>

          <p className="md:hidden text-[14px] text-[#1e2223]">
            Fast. Easy. Reliable. OneCart Shopping
          </p>
        </div>

        {/* CENTER */}
        <div className="md:w-[25%]">
          <h2 className="text-[20px] font-semibold text-[#1e2223] mb-4">
            COMPANY
          </h2>

          <ul className="flex flex-col gap-2 text-[15px] text-[#1e2223]">
            <li className="cursor-pointer hover:text-black">
              Home
            </li>

            <li className="cursor-pointer hover:text-black">
              About Us
            </li>

            <li className="cursor-pointer hover:text-black">
              Delivery
            </li>

            <li className="cursor-pointer hover:text-black">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="md:w-[25%]">
          <h2 className="text-[20px] font-semibold text-[#1e2223] mb-4">
            GET IN TOUCH
          </h2>

          <ul className="flex flex-col gap-2 text-[15px] text-[#1e2223]">
            <li>+91-9876543210</li>
            <li>contact@onecart.com</li>
            <li>+1-123-456-7890</li>
            <li>admin@onecart.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-400 py-4 text-center text-[14px] text-[#1e2223]">
        Copyright 2025 © OneCart. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;