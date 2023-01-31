import { Button, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { FaCartPlus } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import Grids from './Grids';


export const Order = () => {
    const current = new Date();
   
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getOrders();
    }, [])
    const getOrders = () => {
        axios.get('http://localhost:8080/order/get')
            .then(response => {
                console.log(response.data);
                setOrders(response.data)
            })
            .catch(error => {
                console.log(error);
            })

    }
    const test = () => {
        console.log('test');
    }
    const deleteOrders = (orderId) => {
        axios.delete(`http://localhost:8080/order/delete/${orderId}`)
            .then(res => {
                getOrders();
            })

            .catch(error => {
                console.log(error);
            })
    }
    return (
        <>
            <Button variant='outlined' color='primary'>
                <Link to='/ordersuser/cartuser'><FaCartPlus/>CART</Link>
            </Button>
            <div>
                <Grids product={orders} delete={deleteOrders} check={test}></Grids>
            </div>
            <div>
            </div>
        </>
    )
}