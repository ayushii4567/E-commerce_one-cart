import React, { useEffect, useState } from "react";
import Background from "../Component/Background";
import Hero from "../Component/Hero";
import Product from "./Product";
import OurPolicy from "../Component/OurPolicy";
import NewLetterBox from "../Component/NewLetterBox";
import Footer from "../Component/Footer";

function Home() {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" },
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev === 3 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
<div className="pt-[70px] overflow-x-hidden min-h-screen">
      <div className="w-full h-screen bg-[#03161c] flex items-center justify-between">
        <Hero
          heroData={heroData[heroCount]}
          heroCount={heroCount}
          setHeroCount={setHeroCount}
        />

        <Background heroCount={heroCount} />
      </div>
      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  );
}

export default Home;
