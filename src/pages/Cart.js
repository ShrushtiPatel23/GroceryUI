import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardProduct from '../components/CardProduct'
import toast from 'react-hot-toast'
import { deleteAllCartItem } from '../redux/createSlice'


function Cart() {
  const [total, setTotal] = useState('');

  const userData = useSelector((state) => state.user)
  console.log(userData)

  const productCartItem = useSelector((state) => state.product.cartItem)
  console.log(productCartItem)

  const dispatch = useDispatch()

  function handleBuyItem() {
    return (
      <>
        {userData.image ?
          dispatch(deleteAllCartItem()) : toast('Please login with emailId')}
      </>
    )
  }

  useEffect(() => {
    setTotal(productCartItem.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))
  }, [productCartItem])

  return (
    <div className='p-2 md:p-4'>
      <h2 className='text-lg md:text-2xl font-bold text-slate-600 mt-2 p-3'>Your Cart Items</h2>
      <div className='w-full max-w-3xl'>
        {
          productCartItem.map(el => {
            return (
              <CardProduct key={el._id}
                id={el._id}
                name={el.name}
                image={el.image}
                category={el.category}
                qty={el.qty}
                total={el.total}
                price={el.price} />

            )
          })
        }
        {productCartItem.length !== 0 &&
          <div className='flex justify-between my-2 border border-slate-300 shadow bg-yellow-400 text-center p-2 cursor-pointer' onClick={handleBuyItem}>
            <div> Buy Now </div>
            <div className='mx-5'>Total : <span className='text-red-500'>&#8377;</span>
              <span>{total}</span>
            </div>
          </div>}
      </div>

    </div>
  )
}

export default Cart