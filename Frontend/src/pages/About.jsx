import React from 'react'
import Title from '../Component/Title'
import about from '../assets/about.png'
import NewLetterBox from '../Component/NewLetterBox'
import Footer from '../Component/Footer';

function About() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[120px]  flex flex-col items-center gap-[90px] overflow-x-hidden">

      {/* ABOUT SECTION */}
      <div className="w-full flex flex-col items-center gap-[60px]">

        <Title text1={"ABOUT"} text2={"US"} />

        <div className="w-[90%] max-w-[1400px] flex flex-col lg:flex-row items-center justify-between gap-[60px]">

          {/* IMAGE */}
          <div className="lg:w-[48%] w-full flex items-center justify-center">
            <img
              src={about}
              alt="about"
              className="w-full max-w-[650px] rounded-[12px] shadow-2xl shadow-black/40 object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="lg:w-[48%] w-full flex flex-col gap-[22px] text-left">

            <p className="text-white text-[15px] md:text-[18px] leading-[34px] tracking-[0.3px]">
              OneCart was built for smart and seamless shopping — created to
              deliver quality products, trending styles, and everyday essentials
              all in one place. With reliable service, fast delivery, and great
              value, OneCart makes your online shopping experience smooth,
              simple, and stress-free.
            </p>

            <p className="text-white text-[15px] md:text-[18px] leading-[34px] tracking-[0.3px]">
              Designed for modern shoppers, OneCart combines style,
              convenience, and affordability. Whether it’s fashion,
              essentials, or trending products, we bring everything you need
              to one trusted platform with easy returns and customer-first
              service.
            </p>

            <div className="flex flex-col gap-[10px] mt-[10px]">

              <h2 className="text-[#bff1f9] text-[24px] font-semibold">
                Our Mission
              </h2>

              <p className="text-white text-[15px] md:text-[18px] leading-[34px] tracking-[0.3px]">
                To create an online shopping experience that saves time,
                delivers value, and fits every lifestyle with trust,
                convenience, and innovation.
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="w-full flex flex-col items-center gap-[50px]">

        <Title text1={"WHY"} text2={"CHOOSE US"} />

        <div className="w-[90%] max-w-[1400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">

          {/* CARD 1 */}
          <div className="min-h-[280px] border border-white/20 rounded-[18px] bg-[#ffffff0b] backdrop-blur-md px-[35px] py-[40px] flex flex-col gap-[22px] hover:translate-y-[-6px] transition-all duration-300">

            <h2 className="text-[#bff1f9] text-[24px] font-semibold">
              Quality Assurance
            </h2>

            <p className="text-white text-[16px] leading-[32px]">
              We guarantee quality through strict checks, reliable sourcing,
              and a strong commitment to customer satisfaction at every step.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="min-h-[280px] border border-white/20 rounded-[18px] bg-[#ffffff0b] backdrop-blur-md px-[35px] py-[40px] flex flex-col gap-[22px] hover:translate-y-[-6px] transition-all duration-300">

            <h2 className="text-[#bff1f9] text-[24px] font-semibold">
              Convenience
            </h2>

            <p className="text-white text-[16px] leading-[32px]">
              Shop easily with fast delivery, smooth navigation, secure
              checkout, and everything you need in one trusted place.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="min-h-[280px] border border-white/20 rounded-[18px] bg-[#ffffff0b] backdrop-blur-md px-[35px] py-[40px] flex flex-col gap-[22px] hover:translate-y-[-6px] transition-all duration-300">

            <h2 className="text-[#bff1f9] text-[24px] font-semibold">
              Exceptional Customer Service
            </h2>

            <p className="text-white text-[16px] leading-[32px]">
              Our dedicated support team ensures quick responses, helpful
              solutions, and a smooth shopping experience every time.
            </p>
          </div>

        </div>
      </div>

      <NewLetterBox />
      <Footer />

    </div>
  );
}

export default About;
