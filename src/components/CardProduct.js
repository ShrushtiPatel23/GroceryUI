import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { LuMinus } from 'react-icons/lu'
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteCartItem,increaseQty,decreseQty } from '../redux/createSlice';

export default function CardProduct({ id, name, image, category, qty, price, total }) {
    const dispatch=useDispatch()

    return (
        <div className='bg-slate-200 p-2 flex gap-4 rounded border border-slate-300 mt-5'>
            <div className='bg-white p-3 rounded overflow-hidden'>
                <img src={image} className='h-28 w-32 object-cover' alt='' />
            </div>
            <div className='flex flex-col gap-1 w-full'>
                <div className='flex justify-between'>
                    <h3 className='font-semibold  capitalize text-lg text-slate-600 md:text-xl mx-5'>
                        {name}
                    </h3>
                    <span className='cursor-pointer text-slate-500 hover:text-red-700' onClick={() => dispatch(deleteCartItem(id))}><MdDelete fontSize='20px'/></span>
                </div>
                <p className='ml-5 text-slate-600 text-2xl font-medium'>
                    {category}
                </p>
                <p className='font-bold text-2xl ml-5'>
                    <span className='text-red-500'>&#8377;</span>
                    <span>{price}</span>
                </p>
                <div className='flex justify-between mx-2'>
                    <div className='flex gap-3 items-center'>
                        <button className='bg-slate-300 p-1 py-2 my-5 mt-2 rounded hover:bg-slate-400' onClick={() => dispatch(increaseQty(id))}><FaPlus /></button>
                        <p className='font-semibold'>{qty}</p>
                        <button className='bg-slate-300 p-1 py-2 my-5 mt-2 rounded hover:bg-slate-400' onClick={() => dispatch(decreseQty(id))}><LuMinus /></button>

                    </div>
                    <div className='flex items-center gap-2 font-bold'>
                        <p>Total</p>
                        <p><span className='text-red-500'>&#8377;</span>
                        <span>{total}</span></p>
                    </div>
                </div>
            </div>

        </div>
    )
}
