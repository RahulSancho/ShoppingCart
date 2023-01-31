import axios from 'axios'
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './PaymentStyles.css'

export  const  Payment=()=> {
    const[showpayment,setShowPayment]=useState([]);
    useEffect(()=>{
        getPayment();
    },[])

    const getPayment=()=>{
        axios.get('http://localhost:8080/payment/get')
        .then(response=>{
            setShowPayment(response.data)
            console.log(response.data);

        })
        .catch(error=>{
            console.log(error);
        })
    }
  return (
    <>
    <Link to='/invoiceuser'>INVOICE</Link>
    {
        _.map(showpayment,(p)=>
        <div className='paymentDetails'>
            <div className='payment-list'>
                <label>PAYMENTMODE</label>
                <p>{p.paymentMode}</p>
                <div>
                    <label>DATE</label>
                    <p>{moment(p.date).format('l')}</p>
                </div>
                <div>
                    <label>PRODUCTNAME</label>
                    <p>{p.orders.productName}</p>
                </div>
                <div>
                    <label>PRICE</label>
                    <p>{p.orders.amount}</p>
                </div>
                <div>
                    <label>USERID</label>
                    <p>{p.userId}</p>
                </div>

            </div>

        </div>
        )
    }
    </>
  )
}
