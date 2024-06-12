import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Filter from './Filter'
import CardFeature from './CardFeature'
import { PiForkKnifeBold } from 'react-icons/pi'

function AllProduct({ heading }) {
    const productData = useSelector((state) => state.product.productList)

    const categoryList = [...new Set(productData.map(el => el.category))]
    console.log(categoryList)
    
    const [dataFilter, setDataFilter] = useState([])

    useEffect(() => {
        setDataFilter(productData)
    }, [productData])

    const handleFilterProduct = (category) => {
        const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
        setDataFilter(() => {
            return [
                ...filter
            ]
        })
    }

    

    const handleAllProduct = () => {

        setDataFilter(() => {
            return [
                ...productData
            ]
        })
    }


    return (
        <div className='my-5'>
            <h2 className='font-bold text-2xl text-slate-800 mb-5'>{heading}</h2>
            <div className='flex gap-4 justify-center items-center overall-scroll scrollbar-none mb-4'>
                {
                    categoryList[0] && categoryList.map((el, i) => {
                        return (
                            // console.log(el)
                            <Filter category={el} key={i} onClick={() => handleFilterProduct(el)} />

                        )
                    })
                }
                <div onClick={() => handleAllProduct()} className='cursor-pointer'>
                <div className='md:text-3xl md:p-5 p-2 bg-yellow-500 rounded-full'>
                <PiForkKnifeBold className='m-auto'/>
                </div>
                <p className='text-xs md:text-base text-center font-medium my-1 capitalize'>Clear Filter</p>
                </div>


            </div>
            <div className='flex flex-wrap justify-center gap-4'>
                {
                    dataFilter.map(el => {
                        return (
                            <CardFeature key={el._id}
                                id={el._id}
                                image={el.image}
                                name={el.name}
                                category={el.category}
                                price={el.price} />
                        )
                    })
                }

            </div>

        </div>

    )
}

export default AllProduct