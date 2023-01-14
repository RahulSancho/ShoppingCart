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
        <>
            <nav>



                {/* <div>
                    <ul id="navbar">
                        <li><a href=""><NavLink to='/orders'>ORDERS</NavLink></a> </li>
                        <li><a href=""> <NavLink to='/products '>PRODUCTS </NavLink>
                        </a> </li>
                        <li><a href=""><NavLink to='/categories'>CATEGORIES</NavLink></a></li>


                        <li><a href=""><NavLink to='/payments'>PAYMENT </NavLink></a> </li>

                        <li><a href=""><NavLink to='/users'>USERS </NavLink></a> </li>


                    </ul>
                </div> */}
                <div className='navbutton'>

                    <div className='shopping'><h1>Shopping</h1></div>
                    <img src={logo} className='my-logo' alt='logo' ></img>
                    <button onClick={() => handleShow("showorders")}>Orders</button>
                    <button onClick={() => handleShow("showproducts")}>Products</button>
                    <button onClick={() => handleShow("showcategories")}>Categories</button>
                    <button onClick={() => handleShow("showpayments")}>Payments</button>
                    <button onClick={() => handleShow("showusers")}>Users</button>
                </div>

            </nav>
            <div>


                {showorders ? <Orders></Orders> : null}
                {showproducts ? <Products></Products> : null}
                {showcategories ? <Categories></Categories> : null}
                {showpayments ? <Payments></Payments> : null}
                {showusers ? <Users></Users> : null}


            </div>


        </>
    )
}


export default Home;