import React from "react";
import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import back3 from "../assets/back3.jpg";
import back4 from "../assets/back4.jpg";

function Background({ heroCount }) {
  const images = [back2, back1, back3, back4];

  return (
    <div className="w-[52%] h-full overflow-hidden relative grid grid-cols-2 grid-rows-3 gap-0">
      <div className="overflow-hidden group row-span-1">
        <img
          src={images[heroCount]}
          alt="fashion"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
      </div>

      <div className="overflow-hidden bg-[#ffa34d] group row-span-1">
        <img
          src={back1}
          alt="fashion"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-95"
        />
      </div>

      <div className="relative overflow-hidden group row-span-2">
        <img
          src={back2}
          alt="fashion"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[150px] h-[150px] rounded-full bg-orange-400/70 blur-2xl animate-pulse" />
          <div className="absolute w-[220px] h-[220px] rounded-full border-[18px] border-sky-300/70" />

          <h2 className="relative z-10 text-white text-[28px] md:text-[36px] text-center font-light leading-tight transition-all duration-500 hover:scale-105">
            Accessories
            <br />
            Sale!
          </h2>
        </div>
      </div>

      <div className="grid grid-rows-2 row-span-2 overflow-hidden">
        <div className="overflow-hidden group bg-[#f3dfc3]">
          <img
            src={back3}
            alt="fashion"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>

        <div className="overflow-hidden group bg-[#ffc66c]">
          <img
            src={back4}
            alt="fashion"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
}

export default Background;
