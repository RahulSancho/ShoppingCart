import { Link } from 'react-router-dom';
import logo from '../Component/logo.svg';
import './HomeStyles.css'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Orders } from '../Component/Orders';
import { Products } from '../Component/Products';
import {Payments} from '../Component/Payments';
import { Categories } from '../Component/Categories';
import { Users } from '../Component/Users';
import { Button } from '@mui/material';




function Home() {
    const [showorders, setShowOrders] = useState(false);
    const [showproducts, setShowProducts] = useState(false);
    const [showcategories, setShowCategories] = useState(false);
    const [showpayments, setShowPayments] = useState(false);
    const [showusers, setShowUsers] = useState(false);
    useEffect(() => {
        handleShow();

    }, [])


    const handleShow = (e) => {
        if (e === "showorders") {
            setShowOrders(!showorders)
            setShowCategories(false)
            setShowUsers(false)
            setShowPayments(false)
            setShowProducts(false)
        }
        else if (e === "showproducts") {
            setShowProducts(!showproducts)
            setShowCategories(false)
            setShowUsers(false)
            setShowPayments(false)
            setShowOrders(false)

        }
        else if (e === "showcategories") {
            setShowCategories(!showcategories)
            setShowUsers(false)
            setShowPayments(false)
            setShowOrders(false)
            setShowProducts(false)

        }
        else if (e === "showpayments") {
            setShowPayments(!showpayments)
            setShowCategories(false)
            setShowUsers(false)
            setShowOrders(false)
            setShowProducts(false)

        }
        else if (e === "showusers") {
            setShowUsers(!showusers)
            setShowPayments(false)
            setShowCategories(false)
            setShowOrders(false)
            setShowProducts(false)

        }
    }


    return (
        <div style={{height: '100vh'}}>
                <div className='navbutton'>
                    <div className='shopping'><h1>Shopping</h1></div>
                    <img src={logo} className='my-logo' alt='logo' ></img>
                    <Button variant='outlined' className='primary' style={{borderRadius: '20px', backgroundColor: 'white'}} onClick={() => handleShow("showorders")}>Orders</Button>
                    <Button variant='outlined' className='primary' style={{borderRadius:'20px',backgroundColor:'white'}} onClick={() => handleShow("showproducts")}>Products</Button>
                    <Button variant='outlined' className='primary' style={{borderRadius:'20px',backgroundColor:'white'}} onClick={() => handleShow("showcategories")}>Categories</Button>
                    <Button variant='outlined' className='primary' style={{borderRadius:'20px',backgroundColor:'white'}} onClick={() => handleShow("showpayments")}>Payments</Button>
                    <Button variant='outlined' className='primary' style={{borderRadius:'20px',backgroundColor:'white'}} onClick={() => handleShow("showusers")}>Users</Button>
                    <Button variant='outlined' className='primary' style={{borderRadius:'20px',backgroundColor:'white'}}><NavLink className='logout' to='/login'> LogOut</NavLink></Button>
                </div>
        { !showorders && !showproducts && !showcategories && !showpayments && !showusers ? 
        <div className='bg-image'></div> : "" }
                {showorders ? <Orders></Orders> : null}
                {showproducts ? <Products></Products> : null}
                {showcategories ? <Categories></Categories> : null}
                {showpayments ? <Payments></Payments> : null}
                {showusers ? <Users></Users> : null}
        </div>
    )
}


export default Home;