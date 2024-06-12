import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AllProduct from '../components/AllProduct'
import { addCartItem } from '../redux/createSlice'

function Menu() {
  const { filterBy } = useParams()
  console.log(filterBy)

  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product.productList)
  console.log(productData)

  const productDisplay = productData.filter(el => el._id === filterBy)
  console.log(productDisplay)

  const handleAddCartProduct = (e) => {
    productDisplay.map((el) =>  dispatch(addCartItem(el)))
    
  }
  return (
    <div className='p-2 md:p-4 mt-5'>
      {productDisplay.length !== 0 && <div className='w-full max-w-3xl m-auto md:p-4 md:flex flex'>
        <div className='w-1/2 overflow:hidden' >
          <img src={productDisplay[0]?.image} alt='' className='h-60 md:h-full hover:scale-105 transition-all' />
        </div>

        <div className='flex flex-col gap-5 ml-4'>
          <h3 className='font-semibold ml-2 capitalize text-3xl text-slate-700'>
            {productDisplay[0]?.name}
          </h3>
          <p className='ml-2 text-slate-600 text-2xl font-medium'>
            {productDisplay[0]?.category}
          </p>
          <p className='font-bold text-2xl ml-2'>
            <span className='text-red-500'>&#8377;</span>
            <span>{productDisplay[0]?.price}</span>
          </p>
          <div className='ml-2 m-2 mb-0'>
            <button className='bg-yellow-500 min-w-[100px] py-2 my-5 mt-2 rounded hover:bg-yellow-700' onClick={handleAddCartProduct}>Add Cart</button>
          </div>

          <div className='flex gap-2 text-md ml-2'>
            <p>Description:</p>
            <p>{productDisplay[0]?.description}</p>
          </div>
        </div>
      </div>}

      <AllProduct heading="Related Product" />
    </div>
  )
}

export default Menu
