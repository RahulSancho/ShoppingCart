import { Button } from '@mui/material'
import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './InvoiceStyles.css'

export class Invoice extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      errorMsg: ''
    }
  }
  componentDidMount() {
    axios.get('http://localhost:8080/invoice/get')
      .then(response => {
        console.log(response)
        this.setState({ posts: response.data })
      })
      .catch(error => {
        console.log(error)
        this.setState({ errorMsg: "error retriving data" })
      })
  }
  renderTable = () => {
    return (
      <tbody>{
        this.state.posts.map(p =>
          <tr>

        
            <td>{p.payment?.orders?.orderId}</td>
            <td>{p.payment.date}</td>
            <td>{p.payment.paymentMode}</td>
            <td>{p.payment.orders.amount}</td>
          </tr>



        )


      }
      </tbody>
    )
  }
  render() {
    const { posts, errorMsg } = this.state
    return (
      <>
     
       <Button variant='outlined' className='primary' style={{borderRadius:'20px',backgroundColor:'#1DA1F2'}}><Link className='back' to='/home'>Back</Link></Button> 
        <table className='invoiceTable'>
          <thead>
           
            <th>ORDERID</th>
            <th>DATE</th>
            <th>PAYMENTMODE</th>
            <th>AMOUNT</th>
          </thead>
          {this.renderTable()}
        </table>
      </>
    )
  }
}

export default Invoice