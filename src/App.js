import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataProduct } from './redux/createSlice';

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product)
  
 
  useEffect(()=> {
    (async()=>{
      const resData = await fetch(`${process.env.REACT_APP_SERVICE_DOMAIN}product`)
      const res=await resData.json()
      console.log(res)
      dispatch(setDataProduct(res))
      
    })()
  },[])
  console.log(productData);
  
  return (
    <>
    <Toaster/>
    <div>
      <Header />
      <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
      <Outlet/>
    
      </main>
    </div>
    </>
  );
}

export default App;
