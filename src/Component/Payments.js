import axios from 'axios';
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import './PaymentStyles.css'
import { Link } from 'react-router-dom'

export const Payments = () => {
  const[payment,setShowPayments]=useState([]);
useEffect(()=>{
  getPayment();
},[])

   const getPayment=()=>{
    axios.get('http://localhost:8080/payment/get')
    .then(response=>{
      setShowPayments(response.data)
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error
        );
    })
   }
  return (
    <>
    <div><h1>Payments</h1></div>
    <div><Link className='invoiceo' to='/invoice'>Invoice</Link></div>
    <table className='paymentTable'>
      <thead>
      
            <th>PAYMENTMODE</th>
            <th>DATE</th>
            <th>PRODUCTNAME</th>
            <th>AMOUNT</th>
            <th>USERID</th>
        
      </thead>
      <tbody>{
        payment.map(p=>
          <tr>
           
            <td>{p.paymentMode}</td>
            <td>{moment(p.date).format('l')}</td>
            <td>{p.orders.productName}</td>
            <td>{p.orders.amount}</td>
            <td>{p.userId}</td>
            
          </tr>
          )
        }

      </tbody>
    </table>
    </>
  )
}
