
import React from 'react'
import { Container, Navbar} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import hero_image from '../images/hero-image.png'
import logo from '../images/logo1.png'


function HeroPartner() {
    let navigate = useNavigate();
    return (
        <>
            <div style={{ backgroundColor: '#f8d8df' }}>
            <Navbar>
                    <Container>
                        <Navbar.Brand >
                            <img
                                src={logo}
                                width="120"
                          
                                className="d-inline-block align-top"
                                alt="logo"
                            />
                        </Navbar.Brand>
                    </Container>
                </Navbar>

            <div className='flex' >
       

                <div lg={6} style={{ justifyContent: 'center', alignItems: 'center' }} className='justify-items-stretch basis-1/2'>
                    <div className='ml-32 mb-2 -mt-20'>
                        <h1 className='text-7xl text-black hover:text-gray-800 pt-auto  font-semibold' style={{ marginTop: '18rem' }}>partner with us</h1>
                    </div>
                    <div className='ml-32'>
                        <h1 className='text-[#ff246f] text-6xl font-semibold'>set a new milestone</h1>
                    </div>
                    <div className='ml-32 mt-6'>
                        <p className='font-normal text-gray-600 text-3xl'>get direct access to {"India's"} hardcore foodies by partnering with us</p>
                    </div>

                    <div className='ml-32 mt-6'>
                        <button onClick={() => navigate(`/signup`)} className='bg-pink-700 hover:bg-gray-800 text-white text-xl font-semibold py-4 px-2 w-52 '>Get started &#8594;</button>
                    </div>



                </div>
                <div lg={6} className='justify-items-stretch basis-1/2'>
                    <img src={hero_image} className='img-fluid -mt-10' style={{ height: '105vh' }} alt='Hero Partner' />
                </div>
            </div>
            </div>
        </>
    )
}

export default HeroPartner