import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaTrash } from "react-icons/fa";

import './CartStyles.css'
import { Button } from '@mui/material';


export const Cart = () => {
  const [cart, setCart] = useState([])
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;



  useEffect(() => {
    getCart();

  }, [])
  const getCart = () => {
    axios.get('http://localhost:8080/cart/get')
      .then(response => {
        setCart(response.data)
        console.log(response.data);
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
      date: '',
    }
    axios.post(`http://localhost:8080/order/post`, order)
      .then(res => {
        console.log(res.data);


      })










  }
  return (
    <>
    
      <Button variant='outlined' className='primary' style={{borderRadius:'20px',backgroundColor:'#1DA1F2'}}><Link className='back' to='/home'>Back</Link></Button>
      <table className='cartTable'>
        <thead>


          <th>PRODUCTID</th>
          <th>DATE</th>
          <th>PRODUCTNAME</th>
          <th>ACTION</th>
        </thead>

        <tbody>{
          cart.map(p =>
            <tr>

              <td>{p.productId}</td>
              <td>{date}</td>
              <td>{p.productName}</td>
              <td> <button className='actionBtn' onClick={() => deleteCart(p.cartId)} title='Remove'><FaTrash/></button>
                <button className='actionBtn' onClick={() => placeOrder(p)} title='placeorder'><FaHeart/></button></td>

            </tr>
          )
        }

        </tbody>
      </table>
    </>
  )
}
