
// import { Link } from "react-router-dom";
import React, { useState } from 'react'
import { Button, Col, Container, Form, Modal, Navbar, Row, Table } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from '../images/logo1.png'
import createdvector from '../images/Vector (2).svg'
import CouponJson from './CoupunJson.js'
import { auth } from '../firebase-config'
import { signOut } from 'firebase/auth'
function Dashboard() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState(CouponJson);
    const [coupon, setCoupon] = useState([{
        "expiry_date": "",
        "Discount_Percentage": 0,
        "ProductID": "",
        "ProductName": "",
        "Number_of_Coupons": 0
    }]);

    const [coupunCounter, setCoupunCounter] = useState(1);
    let navigate = useNavigate();
    const logout = async () => {
        await signOut(auth);
        navigate('/');
    };


    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add a Coupun</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Row className='my-4'>
                            <Col>
                                <Button onClick={() => { setCoupunCounter(coupunCounter + 1) }}>Add</Button>
                            </Col>
                            <Col>
                                {
                                    coupunCounter !== 1 ? (<> <Button onClick={() => { coupunCounter !== 1 ? setCoupunCounter(coupunCounter - 1) : setCoupunCounter(1) }}>Remove</Button></>) : (<></>)
                                }

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table >
                                    <thead>
                                        <tr>
                                            <th> Product Name  </th>

                                            <th> Number of Coupuns </th>

                                            <th>Discount (%)</th>
                                            <th> Expiry Date </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <>
                                            {
                                                [...Array(coupunCounter)].map((elementInArray, index) => {
                                                    return (
                                                        <tr>
                                                            <td>

                                                                <Form.Control type="text" name='productName' placeholder="Product Name" onChange={(e) => setCoupon(coupon.ProductName = e.target.value)} />

                                                            </td>
                                                            <td>
                                                                <Form.Control type="number" name='numberOfCoupuns' placeholder="Number of Coupuns" onChange={(e) => setCoupon(coupon.Number_of_Coupons = e.target.value)} />
                                                            </td>
                                                            <td>
                                                                <Form.Control type="number" name='discountPercentage' placeholder="Discount Percentage" onChange={(e) => setCoupon(coupon.Discount_Percentage = e.target.value)} />
                                                            </td>
                                                            <td>
                                                                <Form.Control type="date" name='expiryDate' onChange={(e) => setCoupon(coupon.expiry_date = e.target.value)}/>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                )
                                            }
                                        </>
                                    </tbody>


                                </Table>
                            </Col>
                        </Row>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleClose() }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { setData([]); handleClose() }}>
                        Add Coupun
                    </Button>
                </Modal.Footer>
            </Modal>
            <Navbar className="bg-[#fad0df] shadow-lg">
                <Container>
                    <Navbar.Brand href="/" style={{ display: 'flex' }}>
                        <img
                            alt=""
                            src={logo}
                            width="80"
                            className="d-inline-block align-top"
                        />{' '}
                        <h3 className='my-auto py-auto mx-2 font-normal'>FamFood</h3>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <p className='bg-[#ffffff]  rounded-md hover:bg-[#d68c8c] text-pink-700 hover:text-white text-xl font-semibold py-3 px-2  my-2 text-center'>{auth.currentUser ? auth.currentUser.email : null}</p>
                        <button onClick={handleShow} className='bg-[#ffffff]  rounded-md hover:bg-[#d68c8c] text-pink-700 hover:text-white text-xl font-semibold py-3 px-2 w-52 mx-2'> Add a Coupun </button>
                        <button onClick={logout} className=' bg-[#ffffff] rounded-md hover:bg-[#d68c8c] text-pink-700 hover:text-white text-xl font-semibold py-3 w-28 mr-10'> Sign out </button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <div className="lg:mx-44 my-3">

                </div>

                <div className="flex lg:mx-32 ">

                    <div className='flex-1 lg:mx-12'>
                        <div className='created items-center justify-items-center'>
                            <h5 className='text-center pt-3' style={{ color: 'white' }}> 1/5/2020 </h5>
                            <h5 className='text-center py-2 font-semibold' style={{ color: 'white' }}> Joined </h5>
                            <img src={createdvector} alt="alt" className='mx-auto' />
                        </div>
                    </div>
                    <div className='flex-1 lg:mx-12'>
                        <div className='processed'>
                            <h5 className='text-center pt-3' style={{ color: 'white' }}> Rs 2,00,000 </h5>
                            <h5 className='text-center py-2 font-semibold' style={{ color: 'white' }}> Sales so Far </h5>
                            <img src={createdvector} alt="alt" className='mx-auto' />
                        </div>
                    </div>
                    <div className='flex-1 lg:mx-12'>
                        <div className='approved' >
                            <h5 className='text-center pt-3' style={{ color: 'white' }}> 50 </h5>
                            <h5 className='text-center py-2 font-semibold' style={{ color: 'white' }}> Fam reviews </h5>
                            <img src={createdvector} alt="alt" className='mx-auto' />
                        </div>
                    </div>
                    <div className='flex-1 lg:mx-12'>
                        <div className='disbursed'>
                            <h5 className='text-center pt-3' style={{ color: 'white' }}> Rs. 1000 </h5>
                            <h5 className='text-center py-2 font-semibold' style={{ color: 'white' }}> Value Donated </h5>
                            <img src={createdvector} alt="alt" className='mx-auto' />
                        </div>
                    </div>
                </div>
                <div className='flex lg:mx-44 mt-20'>
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    Product ID
                                </th>
                                <th>
                                    Product Name
                                </th>
                                <th>
                                    Discount Percentage
                                </th>
                                <th>
                                    Number of Coupons
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>
                                    Expiry Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                CouponJson.map((element) => {
                                    return (
                                        <>

                                            <tr>

                                                <td>

                                                    {element.ProductID}
                                                </td>
                                                <td>
                                                    {element.ProductName}

                                                </td>
                                                <td>
                                                    {element.Discount_Percentage}
                                                </td>
                                                <td>
                                                    {element.Number_of_Coupons}
                                                </td>
                                                <td>
                                                    Active
                                                </td>
                                                <td>
                                                    {element.expiry_date}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </section>
        </>
    )
}

export default Dashboard

