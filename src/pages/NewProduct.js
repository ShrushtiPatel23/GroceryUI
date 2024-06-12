import React, { useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs';
import { ImageBase64 } from '../utility/Imagebase64';
import toast from 'react-hot-toast';

function NewProduct() {

  const [data, setData] = useState({
    name: "",
    category: "Fruits",
    image: "",
    price: "",
    description: ""
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })

    //    setData((prev) => {
    //     return{
    //         ...prev,[name]:value
    //     }
    //    })
  }

  const uploadImage = async (e) => {
    let data = await ImageBase64(e.target.files[0])
    console.log(data)

    setData((preve) => {
      return {
        ...preve,
        image: data
      }
    })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    console.log(data)

    const { name, image, category, price } = data;

    if (name && image && category && price) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVICE_DOMAIN}uploaddata`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      const fetchValue = await fetchData.json()
      toast(fetchValue.message)
      setData(() => {
        return {
          name: "",
          category: "Fruits",
          image: "",
          price: "",
          description: ""
        }
      })
      //console.log(fetchValue)
    } else {
      toast("Enter Required Fields")
    }

  }
  return (
    <div className='p-2  md:p-10'>
      <form className='m-auto w-full max-w-md p-4 shadow flex flex-col p-3 bg-white' onSubmit={handleOnSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' value={data.name} className='bg-slate-200 p-1 my-2' onChange={handleOnChange} />

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-2' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={'other'}>Select Type</option>
          <option value={'fruit'}>Fruits</option>
          <option value={'vegetable'}>Vegetable</option>
          <option value={'icecream'}>IceCream</option>
        </select>

        <label htmlFor='image'>Image
          <div className='h-40 w-full bg-slate-200 my-3 rounded flex items-center justify-center cursor-pointer'>
            {data.image ? <img src={data.image} alt='' className='h-full' />
              : <span className='text-5xl'>
                <BsCloudUpload />
              </span>}

            <input type='file' onChange={uploadImage} accept='image/**' id='image' className='hidden' />
          </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type='text' value={data.price} className='bg-slate-200 p-1 my-1' id='price' name='price' onChange={handleOnChange} />

        <label htmlFor='description'>Description</label>
        <textarea rows={3} id='description' className='bg-slate-200 p-1 my-1 resize-none' name='description' value={data.description} onChange={handleOnChange}></textarea>

        <button className='bg-red-500 hover:bg-red-700 text-white text-lg my-2 font-bold frop-shadow cursor-pointer'>Save</button>
      </form>
    </div>
  )
}

export default NewProduct