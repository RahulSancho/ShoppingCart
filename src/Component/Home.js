
import logo from '../Component/logo.svg';
import './HomeStyles.css'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Products } from '../Component/Products';
import { Categories } from '../Component/Categories';
import { Users } from '../Component/Users';
import { Button } from '@mui/material';





function Home() {

    const [showproducts, setShowProducts] = useState(false);
    const [showcategories, setShowCategories] = useState(false);
    const [showusers, setShowUsers] = useState(false);

    useEffect(() => {
        handleShow();

    }, [])


    const handleShow = (e) => {

        if (e === "showproducts") {
            setShowProducts(!showproducts)
            setShowCategories(false)
            setShowUsers(false)



        }
        else if (e === "showcategories") {
            setShowCategories(!showcategories)
            setShowUsers(false)
            setShowProducts(false)

        }

        else if (e === "showusers") {
            setShowUsers(!showusers)
            setShowCategories(false)
            setShowProducts(false)

        }


    }


    return (
        <div style={{ height: '100vh' }}>
            <div className='navbutton'>
                <div className='shopping'><h1>Shopping</h1></div>
                <img src={logo} className='my-logo' alt='logo' ></img>

                <Button variant='outlined' className='primary' style={{ borderRadius: '20px', backgroundColor: 'white' }} onClick={() => handleShow("showproducts")}>Products</Button>
                <Button variant='outlined' className='primary' style={{ borderRadius: '20px', backgroundColor: 'white' }} onClick={() => handleShow("showcategories")}>Categories</Button>
                <Button variant='outlined' className='primary' style={{ borderRadius: '20px', backgroundColor: 'white' }} onClick={() => handleShow("showusers")}>Users</Button>
                <Button variant='outlined' className='primary' style={{ borderRadius: '20px', backgroundColor: 'white' }}><NavLink className='logout' to='/login'> LogOut</NavLink></Button>
            </div>
            {!showproducts && !showcategories && !showusers ?
                <div className='bg-image'></div> : ""}

            {showproducts ? <Products></Products> : null}
            {showcategories ? <Categories></Categories> : null}
            {showusers ? <Users></Users> : null}

        </div>
    )
}


export default Home;