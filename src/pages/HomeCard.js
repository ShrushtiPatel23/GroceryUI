import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeCard({ name, image, price, category, loading, id }) {
  return (
    <div className='bg-white shadow-md rounded p-2 min-w-[150px]'>
      {
        name ? (
          <>
          <Link to={`/menu/${id}`}>
            <div className='w-40 min-h-[150px]'>
              <img src={image} alt='' className='h-full w-full' />

            </div>
            <h3 className='font-semibold text-slate-600 text-center capitalized text-lg'>{name}</h3>
            <p className='text-center text-slate-500 font-medium'>{category}</p>
            <p className='text-center font-bold'><span className='text-red-800'>&#8377;</span><span>{price}</span></p>
            </Link>
            </>
        ) :(
          <div className='flex justify-center items-center h-full'>
          <p>{loading}</p>
          </div>
        ) 
      }

    </div>
  )
}
