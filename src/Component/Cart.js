import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaTrash } from "react-icons/fa";

import './CartStyles.css'
import { Button } from '@mui/material';
import _ from 'lodash';


export const Cart = () => {
  const [cart, setCart] = useState([])
  const [quantity, setQuantity] = useState(1);
  const [currentCartId,setCurrentCartId] = useState({});
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;



  useEffect(() => {
    getCart();

  }, [])



  const handleQuantity = (index, action) => {
    const changeCart = _.cloneDeep(cart)
    if(action === 'plus')
      changeCart[index].quantity +=1
    else {
      if(changeCart[index].quantity === 0)
        return
      changeCart[index].quantity -=1
    }
    setCart(changeCart)
    

    //  let quan=action ==='plus'? product.productQuantity += 1 : product.productQuantity -= 1
    //  product.productPrice=quan* product.productPrice;
    // axios.put(`http://localhost:8080/products/update/${product.productId}`,product).then(response=>{
    //   console.log(response.data);
    // })
    // .catch(error=>{
    //   console.log(error);
    // })

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

      <Button variant='outlined' className='primary' style={{ borderRadius: '20px', backgroundColor: '#1DA1F2' }}><Link className='back' to='/home'>Back</Link></Button>
      <table className='cartTable'>
        <thead>


          <th>DATE</th>
          <th>PRODUCTNAME</th>
          <th>QUANTITY</th>
          <th>PRICE</th>
          <th>ACTION</th>

        </thead>

        <tbody>{
          _.map(cart, (p,index) =>
            <tr key={p.cartId}>


              <td>{date}</td>
              <td>{p.products?.productName}</td>
              <td><div>
                <button onClick={() => handleQuantity(index, 'plus') } className='increment'>+</button>
                <div>{p.quantity}</div>
                <button onClick={() => handleQuantity(index, 'minus')} className='increment'>-</button>

              </div>
              </td>
              <td>{p.products.productPrice}</td>
              <td> <button className='actionBtn' onClick={() => deleteCart(p.cartId)} title='Remove'><FaTrash /></button>
                <button className='actionBtn' onClick={() => placeOrder(p)} title='placeorder'><FaHeart /></button></td>

            </tr>
          )
        }

        </tbody>
      </table>
    </>
  )
}
