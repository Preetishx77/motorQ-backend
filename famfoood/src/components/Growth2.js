import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Growth2() {
    let navigate = useNavigate();
  return (
    <>
              <div style={{height:'100vh'}} className='bg-sky-50'>


<div className='flex' >


    <div lg={6} style={{ justifyContent: 'center', alignItems: 'center' }} className='justify-items-stretch'>
        <div className='ml-32 mb-2 -mt-20'>
            <h1 className='text-6xl text-black hover:text-gray-800 pt-auto  font-semibold' style={{ marginTop: '18rem' }}> Customer engagement through games </h1>
        </div>
        <div className='ml-32'>
            <h1 className='text-sky-800 hover:text-sky-600 text-5xl font-semibold'> drive sales the fun way ! </h1>
        </div>
        <div className='ml-32 mt-6'>
            <p className='font-normal text-gray-600 text-3xl'> customers who win coupuns through games are 3X likely to make purchases to redeem them!</p>
        </div>

        <div className='ml-32 mt-6'>
            <button onClick={() => navigate(`/signup`)} className='bg-sky-900 hover:bg-gray-800 text-white text-xl font-semibold py-4 px-2 w-52'>Get started &#8594;</button>
        </div>



    </div>
    <div lg={6} className='justify-items-stretch basis-1/2'>
                    <img src='https://web-images.credcdn.in/_next/assets/images/partner/Rewards.png' className='img-fluid pr-20 mt-16' style={{ height: '90vh' }} alt='Hero Partner' />
                </div>
</div>
</div>
</>
  )
}

export default Growth2