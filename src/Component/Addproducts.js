import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './AddProductsStyles.css'


export const Addproducts = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [addproducts, setAddproducts] = useState({
        productName: '',
        productPrice: '',
        categoryId: ''

    });
   
    useEffect(() => {
        console.log(location)
        if (location.state?.store) {
            setAddproducts(location.state.store)
        }
    }, [location])

    const changeHandler = (e) => {
        setAddproducts(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

  
            axios.post('http://localhost:8080/products/post', addproducts).then((res) => {
                console.log(res.data);
                navigate("/Products")
            }).catch(err => console.log(err));
        
    }

    return (
        <>
        <div><h1>Addproducts</h1></div>
      
            <form className='add-products' onSubmit={handleSubmit}>
            <div className='brand'></div>
                <div className='productsbody'>
                <input type="text" placeholder='productName' name='productName' value={addproducts.productName} onChange={changeHandler}></input>
                <input type="text" placeholder='productPrice' name='productPrice' value={addproducts.productPrice} onChange={changeHandler}></input>
                <input type="text" placeholder='categoryId' name='categoryId' value={addproducts.categoryId} onChange={changeHandler}></input>
             
                <button className='add' type='submit'>{addproducts.productId? "update":"Add product"}</button>
                </div>
                 

            </form>
            </>


        
    )
}
