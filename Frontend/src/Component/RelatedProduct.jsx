import React, { useContext, useState, useEffect } from "react";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";
import Card from "./Card";

function RelatedProduct({ category, subCategory, currentProductId }) {
  let { products } = useContext(shopDataContext);
  let [related, setRelated] = useState([]);

  useEffect(() => {

  if (products.length > 0) {

    let productsCopy = products.filter(
      (item) =>
        item.category?.toLowerCase() === category?.toLowerCase() &&
        item.subcategory?.toLowerCase() === subCategory?.toLowerCase() &&
        item._id !== currentProductId
    );

    // fallback if very few related products found
    if (productsCopy.length < 2) {

      productsCopy = products.filter(
        (item) =>
          item.category?.toLowerCase() === category?.toLowerCase() &&
          item._id !== currentProductId
      );

    }

    setRelated(productsCopy.slice(0, 4));
  }

}, [products, category, subCategory, currentProductId]);

  return (
    <div className="my-[130px] md:my-[40px] md:px-[60px] ">
      <div className="ml-[20px] lg:ml-[80px]">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="w-[100%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
        {related.map((item, index) => (
          <Card
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image1}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
