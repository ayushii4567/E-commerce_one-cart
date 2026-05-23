import React from 'react'
import Title from '../Component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../Component/NewLetterBox'
import Footer from '../Component/Footer'

function Contact() {
  return (
  <div className='w-full min-h-screen flex items-center justify-start flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[60px] pt-[120px] '>

    {/* TITLE */}
    <div className="mt-[0px]">
      <Title text1={'CONTACT'} text2={'US'} />
    </div>

    {/* MAIN CONTAINER */}
    <div className='w-[80%] max-w-[1400px] flex items-center justify-center flex-col lg:flex-row gap-[50px]  mt-[-20px]'>

      {/* IMAGE */}
      <div className='lg:w-[50%] w-full flex items-center justify-center'>
        <img
          src={contact}
          alt=""
          className='lg:w-[85%] w-[100%] shadow-2xl shadow-black rounded-[10px]'
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className='lg:w-[45%] w-[90%] flex items-start justify-center gap-[0px] flex-col'>

        <p className='text-white font-bold text-[26px]'>
          Our Store
        </p>

        <div className='text-white text-[17px] leading-[35px]'>
          <p>12345 Random Station</p>
          <p>Random City, State, India</p>
        </div>

        <div className='text-white text-[17px] leading-[35px]'>
          <p>Tel: +91-9876543210</p>
          <p>Email: admin@onecart.com</p>
        </div>

        <p className='text-[24px] text-white font-bold mt-[10px]'>
          Careers at OneCart
        </p>

        <p className='text-white text-[17px] leading-[32px]'>
          Learn more about our teams and job openings
        </p>

        <button className='px-[35px] py-[16px] mt-[40px] text-white border border-white rounded-md hover:bg-white hover:text-black transition-all duration-300'>
          Explore Jobs
        </button>

      </div>
    </div>

    <NewLetterBox />
     <Footer />
   
  </div>
  
)
}

export default Contact
