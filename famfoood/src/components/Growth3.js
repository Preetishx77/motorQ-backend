import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
function Growth3() {
    let navigate = useNavigate();
  return (
   <>     <div style={{height:'100vh'}} className='bg-green-50'>


   <div className='flex' >
   <div lg={6} className='justify-items-stretch basis-1/2'>
                       <img src='https://web-images.credcdn.in/_next/assets/images/partner/Spotlight.png' className='img-fluid pl-10' style={{ height: '95vh' }} alt='Hero Partner' />
                   </div>
   
       <div lg={6} style={{ justifyContent: 'center', alignItems: 'center' }} className='justify-items-stretch'>
           <div className='ml-32 mb-2 -mt-20'>
               <h1 className='text-7xl text-black hover:text-gray-800 pt-auto  font-semibold' style={{ marginTop: '18rem' }}>Build your Community! </h1>
           </div>

           <div className='ml-32'>
               <h1 className='text-emerald-800 hover:text-emerald-500 text-6xl font-semibold'> a fam that loves you !</h1>
           </div>
           <div className='ml-32 mt-6'>
               <p className='font-normal text-gray-600 text-3xl'> building a niche community helps you form stronger relationships with customers, leads, and people in your industry.</p>
           </div>
   
           <div className='ml-32 mt-6'>
               <button onClick={() => navigate(`/signup`)} className='bg-emerald-800 hover:bg-gray-800 text-white text-xl font-semibold py-4 px-2 w-52'>Get started &#8594;</button>
           </div>
   
   
   
       </div>
       
   </div>
   </div></>
  )
}

export default Growth3