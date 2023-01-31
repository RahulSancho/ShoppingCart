import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaTrash } from "react-icons/fa";


import { Button } from '@mui/material';
import _ from 'lodash';
import Grids from './Grids';
import './CartStyles.css'


export const Cart = () => {
  const [cart, setCart] = useState([])
  const [product, setProduct] = useState([])
  const [quantity, setQuantity] = useState(1);
  const [currentCartId, setCurrentCartId] = useState({});
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;



  useEffect(() => {
    getCart();

  }, [])



  const handleQuantity = (index, action) => {
    let pricae = cart[index].products.productPrice
    const changeCart = _.cloneDeep(cart)
    console.log(cart+"gfhj");
    if (action === 'plus'){
      changeCart[index].quantity += 1
      changeCart[index].products.productPrice *=  changeCart[index].quantity
  }
    

    else {
      if( changeCart[index].quantity === 1) return
      changeCart[index].quantity -= 1
      
      
    }
    setCart(changeCart)


    

  }


  const getProducts = () => {
    axios.get('http://localhost:8080/products/get')
      .then(response => {
        setQuantity(response.data);
        console.log(response.data);
      })
      .catch(
        error => {
          console.log(error);
        }
      )

  }

  const getCart = () => {
    axios.get('http://localhost:8080/cart/get')
      .then(response => {
        console.log(response.data);
        let res = response.data
        setCart(res)
        res.map(r => {
          console.log(r, "rerererer");
          setProduct(r)
        })
       
      })
      .catch = (error => {
        console.log(error)
      })
  }

  const deleteCart = (cartId) => {
    axios.delete(`http://localhost:8080/cart/delete/${cartId}`)
      .then(response => {
        getCart();
      })
      .catch(error => {
        console.log(error);
      })
  }
  const placeOrder = (p) => {
    let order = {

      productName: p.productName,
      amount: p.productPrice,
      productQuantity: p.productQuantity,
      date: ''
    }
    axios.post(`http://localhost:8080/order/post`, order)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      })

  }
  return (
    <>
    

      

        {
          _.map(cart, (p, index) =>
            <>
              <div className='cartDetails'>
                <div className='cart-list'>
                  <label>NAME</label>
                  <p>{p.products.productName}</p>
                  <label>PRICE</label>
                  <p>{p.products.productPrice}</p>
                  <div>
                    <label>QUANTITY</label>
                    <button className='cartBtnPlus' onClick={() => handleQuantity(index, 'plus')}>+</button>
                    <div className='count'>{p.quantity}</div>
                    <button className='cartBtnMinus' onClick={() => handleQuantity(index, 'minus')}>-</button>
                  </div><br />
                  <label>DATE</label>
                  <p>{date}</p>
                </div>
              </div>
            </>
          )
  
        }
        </>)
  
  }


