import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { HiOutlineUserCircle } from 'react-icons/hi'
import logo from './assets/home/LOGO.png'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from './redux/userSlice'
import toast from 'react-hot-toast'

function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const userData = useSelector((state) => state.user)
  console.log(userData)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  }

  const handleLogout = () => {
    dispatch(logoutRedux())
    toast('Logout Successfully')
    navigate('/login')
  }
  
    const cartItemNumber=useSelector((state)=>state.product.cartItem)
  return (
    //for responsive = md:px-4 (md:median)
    <header className='fixed shadow-md w-full h-20 px-4 md:px-4 bg-slate-100'>
      <div className='flex mt-3 justify-between'>
        <Link to='/'>
          <div className='h-16'>
            <img src={logo} alt='logo' />
          </div>
        </Link>

        <div className='flex items-center gap-4 md:gap-7'>
          <nav className='gap-4 md:gap-6 text-base md:text-lg hidden md:flex'>
            <Link to="/">Home</Link>
            <Link to="/menu/:filterBy">Menu</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className='text-2xl text-slate-600 relative'>
            <Link to='/cart' ><FaShoppingCart />
            <div className='absolute -top-2 -right-2 text-white bg-red-500 h-4 text-xs w-4 rounded-full text-sm text-center m-0 p-0'>
            {cartItemNumber.length}
            </div>
            </Link>
            </div>
          <div className='text-slate-600' onClick={handleShowMenu}>
            <div className='text-3xl cursor-pointer w-10 h-10 rounded-full overflow-hidden' >
              {userData.image ? <img src={userData.image} alt='' className='h-full w-full' /> : <HiOutlineUserCircle />}
            </div>
            {
              showMenu && (
                <div className='min-w-[120px] text-center absolute right-2 bg-white py-2 shadow flex flex-col'>
                  <Link to='/newProduct' className='whitespace-nowrap cursor-pointer pb-3 px-2'>New Product</Link>
                  {userData.image ?
                    <p className='cursor-pointer text-white bg-red-400 font-medium px-2 pb-3' onClick={handleLogout}>Logout</p>
                    :
                    <Link to='/login' className='whitespace-nowrap cursor-pointer pb-3 px-2'>Login</Link>
                  }
                  <nav className='gap-4 text-base md:text-lg flex flex-col md:hidden'>
                    <Link to="/">Home</Link>
                    <Link to="/menu/:filterBy" >Menu</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                  </nav>

                </div>
              )
            }

          </div>
        </div>



      </div>
    </header>
  )
}

export default Header