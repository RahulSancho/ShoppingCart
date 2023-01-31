import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import './InvoiceStyles.css'

export const Invoice=()=> {
    const[showinvoice,setShowInvoice]=useState([])

    useEffect(()=>{
        getInvoice();
    },[])

    const getInvoice=()=>{
        axios.get('http://localhost:8080/invoice/get')
        .then(response=>{
            setShowInvoice(response.data)
            console.log(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }
  return (
    <>
    {
        showinvoice.map(p=>
            <div className='invoiceDetails'>
           
           <div className='invoice-list' >
            <div >
                
            <label>ORDERID</label>
                <p>{p.payment?.orders?.orderId}</p>
            </div>
            <div>
                <label>DATE</label>
                <p>{moment(p.payment.orders.amount).format('l')}</p>
            </div>
            <div>
                <label>PAYMENTMODE</label>
                <p>{p.payment.paymentMode}</p>
            </div>
            <div>
                <label>PRICE</label>
                <p>{p.payment.orders.amount}</p>
            </div>
           </div>
            </div>



            )
    }
    </>
  )
}
