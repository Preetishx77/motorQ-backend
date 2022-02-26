import React from 'react'
import { Col,Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function Growth5() {
    let navigate = useNavigate();
  return (
    <>     <div style={{height:'100vh'}} className='bg-orange-50'>


    <div className='flex' >
    <div lg={6} className='justify-items-stretch basis-1/2'>
                        <img src='https://web-images.credcdn.in/_next/assets/images/partner/brand_scale.png' className='img-fluid pl-10 pt-20' style={{ height: '85vh' }} alt='Hero Partner' />
                    </div>
    
        <div lg={6} style={{ justifyContent: 'center', alignItems: 'center' }} className='justify-items-stretch'>
            <div className='ml-32 mb-2 -mt-20'>
                <h1 className='text-6xl text-black hover:text-gray-800 pt-auto  font-semibold' style={{ marginTop: '18rem' }}>Scale with a cause! </h1>
            </div>
 
            <div className='ml-32'>
                <h1 className='text-[#ff8d4d] hover:text-amber-600 text-4xl font-semibold'> give back for a social cause </h1>
            </div>
            <div className='ml-32 mt-6'>
                <p className='font-normal text-gray-600 text-3xl pr-2'> Famfood charges a percentage of its fee as a sales channel for the brands towards donations for NGOs! </p>
            </div>
    
            <div className='ml-32 mt-6'>
                <button onClick={() => navigate(`/signup`)} className='bg-[#ff8d4d] hover:bg-gray-800 text-white text-xl font-semibold py-4 px-2 w-52'>Get started &#8594;</button>
            </div>
    
    
    
        </div>
        
    </div>
    </div></>
  )
}

export default Growth5