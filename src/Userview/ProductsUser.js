import React, { Component, useEffect, useState } from 'react'
import _ from 'lodash';
import axios from 'axios';
import { FaBeer, FaDolly, FaEdit, FaHeart, FaTrash } from "react-icons/fa";
import moment from 'moment';

import { Grid, Snackbar } from '@mui/material';
import Grids from './Grids';


export const ProductsUser = () => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState([]);
    const [filtervalue, setFiltervalue] = useState([]);
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState(false);
    const horizontal = "center"
    const vertical = "top"
    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = () => {
        axios.get('http://localhost:8080/products/get')

            .then(response => {
                setProducts(response.data)
                setSearch(response.data)
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleFilter = (e) => {
        if (e.target.value == '') {
            setProducts(search)
        }
        else {
            const filterResult = search.filter(p => p.productName.toLowerCase().includes(e.target.value.toLowerCase()))
            setProducts(filterResult)


        }
        setFiltervalue(e.target.value)

    }

    const placeOrder = (p) => {
        let order = {

            productName: p.productName,
            amount: p.productPrice,
            date: moment().format('DD-MM-YYYY'),



        }
        axios.post(`http://localhost:8080/order/post`, order)
            .then(res => {
                console.log(res.data);
                setOpen(true);


            })



    }
    const addToCart = (p) => {
        let cart = {
            productId: p.productId,
        }
        axios.post(`http://localhost:8080/cart/post`, cart)
            .then(res => {
                console.log(res.data);
                setCart(true);

            })
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setCart(false)
    };
    return (
        <>
            <div>
                <Grids product={products} order={placeOrder()}></Grids>
                </div>

                </>)
                

 

           

       
}