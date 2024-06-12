import React from 'react'
import { PiForkKnifeBold } from 'react-icons/pi'

function Filter({ category, onClick }) {
  return (
    <div onClick={onClick} className='cursor-pointer'>
    <div className='md:text-3xl md:p-5 p-2 bg-yellow-500 rounded-full'>
    <PiForkKnifeBold className='m-auto'/>
    </div>
    <p className='text-xs md:text-base text-center font-medium my-1 capitalize'>{category}</p>
    </div>

  )
}

export default Filter