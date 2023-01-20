import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import './AddProductsStyles.css'



export const Addproducts = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [addproducts, setAddproducts] = useState({
        productName: '',
        productPrice: '',
        parentCategory: ''

    });
    const[display,setDisplay]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8080/categories/get')
        .then(response=>{
            setDisplay(response.data);
            console.log(response.data);

        })
    },[])
   
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

  console.log(addproducts.photos, "new");
  const formData = new FormData();
  formData.append("photos",addproducts.photos)

            axios.post(`http://localhost:8080/products/post/${addproducts.categoryId}/${addproducts.productName}/${addproducts.productPrice}`, formData).then((res) => {
                console.log(res.data);
                navigate("/Products")
            }).catch(err => console.log(err));
        
    }

    return (
        <>
     
     <Button variant='outlined' className='primary' style={{borderRadius:'20px',backgroundColor:'#1DA1F2'}}> <Link className='back' to='/home'>BACK</Link></Button>
            <form className='add-products' onSubmit={handleSubmit}>
            <div className='brand'></div>
                <div className='productsbody'>
                <input type="text" placeholder='productName' name='productName' value={addproducts.productName} onChange={changeHandler}></input>
                <input type="text" placeholder='productPrice' name='productPrice' value={addproducts.productPrice} onChange={changeHandler}></input><br></br>
                <select name='Category' id='Category'  placeholder=' parentCategory' onChange={changeHandler}>
                    
          <option>select Category</option>
                    {display.map(m=><option key={m.categoryId} value={m.categoryId}>{m.categoryId}</option>)}
                    </select> 
                    <br></br>
                <button className='add' type='submit'>{addproducts.productId? "update":"Add product"}</button>
                </div>
                 

            </form>
            </>


        
    )
}
