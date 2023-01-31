import { Button } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoriesUser } from '../Userview/CategoriesUser';
import { Order } from '../Userview/Order';
import { Payment } from '../Userview/Payment';
import { ProductsUser } from '../Userview/ProductsUser';
import logo from '../Component/logo.svg';
import './HomeStyles.css'


export default function Userview() {
  const[showcategories,setShowCategories]=useState(false);
  const[showproducts,setShowProducts]=useState(false);
  const[showorders,setShowOrders]=useState(false);
  const[showpayment,setShowPayment]=useState(false);

  const handleShow=(e)=>{
    if(e==='showcategories'){
      setShowCategories(!showcategories)
      setShowProducts(false)
      setShowOrders(false)
      setShowPayment(false)
    }

    else if(e==='showproducts'){
      setShowProducts(!showproducts)
      setShowCategories(false)
      setShowOrders(false)
      setShowPayment(false)

    }
    else if(e==='showorders'){
      setShowOrders(!showorders)
      setShowCategories(false)
      setShowProducts(false)
      setShowPayment(false)
    }

    else if(e==='showpayment'){
      setShowPayment(!showpayment)
      setShowCategories(false)
      setShowProducts(false)
      setShowOrders(false)
    }

  }
  return (
    <>
      <div style={{ height: '100vh' }}>
            <div className='navbutton'>
                <div className='shopping'><h1>Shopping</h1></div>
                <img src={logo} className='my-logo' alt='logo' ></img>

    <Button variant='outlined' className='primary' style={{borderRadius:'20px',backgroundColor:'white'}} onClick={()=>handleShow('showcategories')}>CATEGORIES</Button>
    <Button variant='outlined' className='primary' style={{borderRadius:'20px',backgroundColor:'white'}} onClick={()=>handleShow('showproducts')}>PRODUCTS</Button>
    <Button variant='outlined' className='primary' style={{borderRadius:'20px',backgroundColor:'white'}} onClick={()=>handleShow('showorders')}>ORDERS</Button>
    <Button variant='outlined' className='primary' style={{borderRadius:'20px',backgroundColor:'white' }} onClick={()=>handleShow('showpayment')}>PAYMENT</Button>
    </div>

    {!showproducts && !showcategories && !showorders && !showpayment ?
                <div className='bg-image'></div> : ""}


    {showcategories?<CategoriesUser></CategoriesUser>:null}
    {showproducts?<ProductsUser></ProductsUser>:null}
    {showorders?<Order></Order>:null}
    {showpayment?<Payment></Payment>:null}
    </div>
    {/* <Link to='/categoriesuser'>Categories</Link>
    <Link to='/productsuser'>Products</Link>
    <Link to='/ordersuser'>Orders</Link>
    <Link to='/paymentuser'>Payment</Link> */}
    </>
  )
}
