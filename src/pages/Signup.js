import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BiHide, BiShow } from 'react-icons/bi'
import { ImageBase64 } from '../utility/Imagebase64';
import loginProfile from '../assets/home/profile.gif';
import { toast } from 'react-hot-toast'


function Signup() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [data,setData] = useState({
        firstName:' ',
        lastName:' ',
        email:' ',
        password:'',
        confirmPassword:'',
        image: '',
    })

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handleOnChange = (e) => {
       
       const {name,value} = e.target
       setData({...data,[name]:value})
    //    setData((prev) => {
    //     return{
    //         ...prev,[name]:value
    //     }
    //    })
        console.log(data)
    }

    const handleProfileImage = async (e) => {
        //console.log(e.target.files[0])
        let imagedata = await ImageBase64(e.target.files[0])
        console.log(imagedata)

        //setData({...data,name:imagedata})

        setData((preve) => {
            return{
                ...preve,
                image:imagedata
            }
        })
    }

    const handleSubmit=async (e) => {
        e.preventDefault()
        const {firstName, lastName,email,password,confirmPassword} = data

        if(firstName && lastName && email &&password && confirmPassword){
            if(password === confirmPassword){
                const fetchdata = await fetch(`${process.env.REACT_APP_SERVICE_DOMAIN}signup`,{
                    method:'POST',
                    headers: {
                        'Content-Type':"application/json"
                    },
                    body:JSON.stringify(data)
                })

                const datasign = await fetchdata.json()
                console.log(datasign)
                toast(datasign.message)
                if(datasign.alert){
                    navigate('/login')
                }
                // alert('form submit', firstName, lastName,email,password,confirmPassword)
                
            }
            else{
                alert('password and confirm password is not match')
            }
        } else {
            alert('Please enter required fields')
        }
    }
    return (
        <div className='p-2 md:p-10'>
            <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
                <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md'>
                    <img src={data.image ? data.image : loginProfile} alt='User login' className='w-full h-full' />
                    
                    {/* upload profile pic */} 
                    <label htmlFor='profileImage'>
                    <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
                    <p className='text-sm p-1 text-white'>Upload</p>
                    </div>
                    <input type='file' name='image' id='profileImage' accept='image/*' className='hidden' onChange={handleProfileImage}/>
                    </label>


                </div>
                <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type={'text'} id='firstName' name='firstName' className='h-10 w-full bg-slate-200 mb-2 px-2 py-1 rounded focus-within:outline-blue-400' value={data.firstName} onChange={handleOnChange}/>

                    <label htmlFor='lastName'>Last Name</label>
                    <input type={'text'} id='lastName' name='lastName' className='h-10 w-full bg-slate-200 mb-2 px-2 py-1 rounded focus-within:outline-blue-400' value={data.lastName} onChange={handleOnChange}/>

                    <label htmlFor='email'>Email</label>
                    <input type={'email'} id='email' name='email' className='h-10 w-full bg-slate-200 mb-2 px-2 py-1 rounded focus-within:outline-blue-400' value={data.email} onChange={handleOnChange}/>

                    <label htmlFor='password'>Password</label>
                    <div className='flex px-2 py-1 bg-slate-200 rounded outline focus-within:outline-blue-400 mb-2 mt-1'>
                        <input type={showPassword ? 'text' : 'password'} id='password' name='password' className='h-10 w-full bg-slate-200 border-none outline-none ' value={data.password} onChange={handleOnChange}/>
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <label htmlFor='confirmPassword'>Confirm-Password</label>
                    <div className='flex px-2 py-1 bg-slate-200 rounded outline focus-within:outline-blue-400 mb-2 mt-1'>
                        <input type={showConfirmPassword ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' className='h-10 w-full bg-slate-200 border-none outline-none ' value={data.confirmPassword} onChange={handleOnChange}/>
                        <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <button className='max-w-[120px] m-auto w-full bg-red-500 hover:bg-red-700 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-3' type='submit'>SignUp</button>
                </form>

                <p className='text-left text-sm mt-3 mb-3'>Already have account ? <Link to='/login' className='text-red-500'>Login</Link></p>
            </div>

        </div>
    )
}

export default Signup