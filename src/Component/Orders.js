import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './OrdersStyles.css'
import moment from 'moment'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom'


export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


  useEffect(() => {
    getOrders();
  },[])

  const getOrders = () => {
    axios.get('http://localhost:8080/order/get').then(res => {
      setOrders(res.data)
      console.log(res);

    })
      .catch(error => {
        console.log(error);
      })

  }

  const deleteOrders=(orderId)=>{
    axios.delete(`http://localhost:8080/order/delete/${orderId}`)
    .then(res=>{
      getOrders();
    })

    .catch(error=>{
      console.log(error);
    })
  }

  return (
    <>
      <div><h1>Orders</h1></div>
     
      <div className='carto'><li><a href=""><NavLink className="link" to='/cart'>CART </NavLink></a> </li></div>
      <table className='OrderTable'>
        <thead>
        
         
         
          <th className='Order-th'>ProductPrice</th>

          <th>DATE</th>
          <th>PRODUCTNAME</th>
          <th>ACTION</th>

        </thead>
        <tbody>{
          orders.map(p =>

            <tr key={p.orderId}>
              
             
          
              <td>{p.amount}</td>
              <td>{date}</td>
              <td>{p.productName}</td>
              <td><button className='actionBtn' onClick={() => deleteOrders(p.orderId)}>Delete</button></td>
            </tr>
          )
        }
        </tbody>
      </table>
    </>

  )
}
