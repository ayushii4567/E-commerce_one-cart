import Card from "./Card";
import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";

function LatestCollection() {
  let { products, search, showSearch } = useContext(shopDataContext);
  let [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {

  let filteredProducts = products || [];

  if (showSearch && search) {

   filteredProducts = filteredProducts.filter((item) =>
  item?.name?.toLowerCase().includes(search.toLowerCase()) ||

  item?.category?.toLowerCase().includes(search.toLowerCase()) ||

  item?.subCategory?.toLowerCase().includes(search.toLowerCase())
);

  }

  setLatestProducts(filteredProducts);

}, [products, search, showSearch]);
  return (
    <div>
      <div className="h-[8%] w-[100%] text-center md:mt-[50px] ">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 ">
          Step Into Style — New Collection Dropping This Season!
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-6">
        {latestProducts.map((item, index) => {
          return (
            <Card
              key={index}
              name={item.name}
              image={item.image1}
              id={item._id}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default LatestCollection;
