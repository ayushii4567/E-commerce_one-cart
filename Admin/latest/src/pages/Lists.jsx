import React, { useContext, useEffect, useState } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

function Lists() {
  let [list, setList] = useState([]);
  let { serverUrl } = useContext(authDataContext);

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");

      setList(result.data.product);

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeList = async (id) => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true },
      );

      if (result.data) {
        fetchList();
      } else {
        console.log("Failed to remove Product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] text-white overflow-x-hidden'>
        
        <Nav />

        <div className='w-full min-h-screen'>

            <Sidebar />

            <div className='w-[82%] ml-[18%] mt-[70px] flex flex-col gap-[30px] py-[50px] px-[40px]'>

                <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white'>
                    All Listed Products
                </div>

                {
                    list?.length > 0 ? (

                        list.map((item) => (

                            <div
                                key={item._id}
                                className='w-full h-[120px] bg-slate-600 rounded-xl flex items-center justify-between px-[25px]'
                            >

                                <div className='flex items-center'>

                                    <img
                                        src={item.image1}
                                        alt={item.name}
                                        className='w-[120px] h-[90px] rounded-lg object-cover'
                                    />

                                    <div className='flex flex-col justify-center ml-[20px]'>

                                        <div className='md:text-[24px] text-[18px] text-[#bef0f3] font-semibold'>
                                            {item.name}
                                        </div>

                                        <div className='md:text-[18px] text-[14px] text-[#bef3da]'>
                                            {item.category}
                                        </div>

                                        <div className='md:text-[18px] text-[15px] text-[#bef3da]'>
                                            ₹{item.price}
                                        </div>

                                    </div>
                                </div>

                                <button
                                    onClick={() => removeList(item._id)}
                                    className='w-[35px] h-[35px] rounded-md border border-red-300 hover:bg-red-300 hover:text-black transition-all'
                                >
                                    X
                                </button>

                            </div>

                        ))

                    ) : (

                        <div className='text-white text-lg'>
                            No products available.
                        </div>

                    )
                }

            </div>
        </div>
    </div>
)
}

export default Lists;
