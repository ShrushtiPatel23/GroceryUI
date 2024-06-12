import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/createSlice';

function CardFeature({ image, price, name, category, loading,id }) {

  const dispatch=useDispatch()

    const handleAddCartProduct=(e)=>{
       
        dispatch(addCartItem({
            _id:id,
            name:name,
            price:price,
            category:category,
            image:image
        }))
      

    }
  return (
    <div className='w-full min-w-[200px] max-w-[200px] bg-white shadow-2xl pt-5 px-5 cursor:pointer flex flex-col'>
      
    {
      image ? (<>
      <Link to={`/menu/${id}`} onClick={() => window.scrollTo({top:'0',behavior:'smooth'})}>
      <div className='h-28 flex justify-center items-center'>
        <img src={image} alt='' className='h-full' />
      </div>
      <h3 className='text-center font-semibold text-slate-600 capitalized text-lg mt-4 overflow-hidden whitespace-nowrap'>{name}</h3>
      <p className='text-center text-slate-500 font-medium'>{category}</p>
      <p className='text-center font-bold'><span className='text-red-800'>&#8377;</span><span>{price}</span></p> 
      </Link>
      <button className='bg-yellow-500 py-1 my-5 mt-2 rounded w-full' onClick={handleAddCartProduct}>Add Cart</button>
      </> 
      ): 
      (
      <div className='min-h-[150px] flex justify-center items-center h-full'>
      <p>{loading}</p>
      </div> 
      )
    }
    
    </div>
  )
}

export default CardFeature;