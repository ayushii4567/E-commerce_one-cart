
import Card from './Card'
import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'


function BestSeller() {
    let { products } = useContext(shopDataContext)
    let [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
  let filterProduct =
    products?.filter((item) => item.bestseller === true) || [];

  setBestSeller(filterProduct);
}, [products]);

    return (
        <div>
            <div className='h-[8%] w-[100%] text-center mt-[50px] '>
                <Title text1={"BEST"} text2={"SELLER"} />
                <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>
                    Tried, Tested, Loved — Discover Our All-Time Best Sellers.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-6">
                {
                    bestSeller.slice(0, 4).map((item, index) => (
                        <Card 
                            key={index} 
                            name={item.name} 
                            id={item._id} 
                            price={item.price} 
                            image={item.image1} 
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller