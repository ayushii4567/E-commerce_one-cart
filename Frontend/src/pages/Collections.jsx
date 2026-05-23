import React, { useContext, useEffect, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";
import Footer from "../Component/Footer";

function Collections() {
  let [showFilter, setShowFilter] = useState(false);
  let { products, search, showSearch } = useContext(shopDataContext);
  let [filterProduct, setFilterProduct] = useState([]);
  let [category, setCaterory] = useState([]);
  let [subCategory, setSubCaterory] = useState([]);
  let [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCaterory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCaterory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCaterory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCaterory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search),
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category),
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subcategory),
      );
    }
    setFilterProduct(productCopy);
  };

  const sortProducts = () => {
    let fbCopy = filterProduct.slice();
    switch (sortType) {
      case "low-high":
        setFilterProduct(fbCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProduct(fbCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);
  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] overflow-x-hidden">
        {/* Sidebar / Filter Section */}

        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-[30vw] lg:w-[20vw] w-full min-h-[162vh] pt-[35px] px-[20px] border-r border-gray-400 text-[#aaf5fa]">
            <p
              className="text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer"
              onClick={() => setShowFilter((prev) => !prev)}
            >
              FILTERS
              {!showFilter && (
                <FaChevronRight className="text-[18px] md:hidden" />
              )}
              {showFilter && (
                <FaChevronDown className="text-[18px] md:hidden" />
              )}
            </p>

            {/* Category Filter */}
            <div
              className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600/10 ${showFilter ? "" : "hidden"} md:block`}
            >
              <p className="mb-3 text-[18px] font-medium text-[#f8fafa]">
                CATEGORIES
              </p>
              <div className="flex flex-col gap-2 text-[16px] font-light text-[#f8fafa]">
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value={"Men"}
                    onChange={toggleCategory}
                    className="w-3"
                  />{" "}
                  Men
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value={"Women"}
                    onChange={toggleCategory}
                    className="w-3"
                  />{" "}
                  Women
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value={"Kids"}
                    onChange={toggleCategory}
                    className="w-3"
                  />{" "}
                  Kids
                </p>
              </div>
            </div>

            {/* SubCategory Filter */}
            <div
              className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600/10 ${showFilter ? "" : "hidden"} md:block`}
            >
              <p className="mb-3 text-[18px] font-medium text-[#f8fafa]">
                TYPE
              </p>
              <div className="flex flex-col gap-2 text-[16px] font-light text-[#f8fafa]">
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value={"TopWear"}
                    onChange={toggleSubCategory}
                    className="w-3"
                  />{" "}
                  Topwear
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value={"BottomWear"}
                    onChange={toggleSubCategory}
                    className="w-3"
                  />{" "}
                  Bottomwear
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value={"WinterWear"}
                    onChange={toggleSubCategory}
                    className="w-3"
                  />{" "}
                  Winterwear
                </p>
              </div>
            </div>
          </div>

          {/* Product Display Section */}
          <div className="flex-1 p-10 flex flex-col">
            <div className="flex justify-between text-base sm:text-2xl mb-4">
              <Title text1={"ALL"} text2={"COLLECTIONS"} />
              {/* Sort Options */}
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border-2 border-gray-300 text-sm px-2 bg-transparent text-white"
              >
                <option className="bg-[#141414]" value="relavent">
                  Sort by: Relevant
                </option>
                <option className="bg-[#141414]" value="low-high">
                  Sort by: Low to High
                </option>
                <option className="bg-[#141414]" value="high-low">
                  Sort by: High to Low
                </option>
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {filterProduct.map((item, index) => (
                <Card
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Collections;
