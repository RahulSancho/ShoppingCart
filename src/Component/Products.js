import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import _ from 'lodash'
import './ProductsStyles.css'
import { Link } from 'react-router-dom'
import { Button, Snackbar } from '@mui/material'
import { FaBeer, FaDolly, FaEdit, FaHeart, FaTrash } from "react-icons/fa";



export const Products = () => {
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

  const deleteProducts = (productId) => {
    axios.delete(`http://localhost:8080/products/delete/${productId}`)
      .then(response => {
        getProducts();

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
      date: '',



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
      date: '',
      productName: p.productName
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


      <Button variant='outlined' className='primary' style={{borderRadius:'20px', backgroundColor:'#1DA1F2'}}><Link className='plink' to='/addproducts'>Add product</Link></Button>
        <input type='search' className='inputSearch' placeholder='What are u looking for' value={filtervalue} onInput={(e) => handleFilter(e)} id="search"/>


      <table className='productTable'>
        <thead>


          <th>PRODUCTNAME</th>
          <th>PRODUCTPRICE</th>
          <th>CATEGORYID</th>
          <th>IMAGE</th>
          <th>ACTION</th>
        </thead>
        <tbody>{
          products.map(p =>

            <tr key={p.productId}>


              <td>{p.productName}</td>
              <td>{p.productPrice}</td>
              <td>{p.categoryId}</td>
              <td><img src={`data:image/jpeg;base64,${p.photos}`} width='50px' height='70px'/></td>
              <td> <Link to={`/edit-product/${p.productId}`} state={{ store: p }}><button className='actionBtn' title='update'><FaEdit/></button></Link>
                <button className='actionBtn' onClick={() => deleteProducts(p.productId)}title='delete'><FaTrash/></button>
                <button className='actionBtn' onClick={() => placeOrder(p)}  title='PlaceOrder'><FaDolly/></button>
                <button className='actionBtn' onClick={() => addToCart(p)}  title='AddToCart'><FaHeart/>

                  <Snackbar
                    open={cart}
                    anchorOrigin={{ horizontal, vertical }}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message="Added To Wishlist"




                  />
                </button>
              </td>
            </tr>
          )
        }
        </tbody>
      </table>

      <Snackbar
        open={open}
        anchorOrigin={{ horizontal, vertical }}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Order Confirmed"




      />

    </>)

}
