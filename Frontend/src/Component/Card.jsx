import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

function Card({ id, name, image, price }) {
  let { currency } = useContext(shopDataContext);
  let navigate = useNavigate();

  return (
    <div
      className="w-full max-w-[280px] mx-auto bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-105 duration-300 flex flex-col p-[10px] cursor-pointer border border-[#80808049]"
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      <img
        src={image}
        alt=""
        className="w-full h-[300px] object-cover rounded-sm"
      />
      <div className="text-[#c3f6fa] text-[18px] py-[10px]">{name}</div>
      <div className="text-[#f3fafa] text-[14px] ">
        {currency}
        {price}
      </div>
    </div>
  );
}

export default Card;
