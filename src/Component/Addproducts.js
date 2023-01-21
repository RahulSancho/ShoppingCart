import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import './AddProductsStyles.css'



export const Addproducts = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const [addproducts, setAddproducts] = useState({
    //     productName: '',
    //     productPrice: '',
    //     parentCategory: '',
    //     photos:''

    // });
    const[productName, setProductName] = useState('')
    const[productPrice, setProductPrice] = useState('')
    const[categoryId, setCategoryId] = useState('')
    const[photos, setPhotos] = useState('')

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
            setProductName(location.state.store)
            setProductPrice(location.state.store)
            setCategoryId(location.state.store)
            setPhotos(location.state.store)
        }
    }, [location])

    // const changeHandler = (e) => {
    //     setAddproducts(prev => ({ ...prev, [e.target.name]: e.target.value }))
    // }

    const handleSubmit = (e) => {
        e.preventDefault()

//   console.log(addproducts.photos, "new");
  const formData = new FormData();
  formData.append("productName",productName)
  formData.append("productPrice",productPrice)
  formData.append("categoryId",categoryId)
  formData.append("photos",photos)

            axios.post(`http://localhost:8080/products/post`, formData).then((res) => {
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
                <input type="text" placeholder='productName' name='productName' value={productName} onChange={e => setProductName(e.target.value)}></input>
                <input type="text" placeholder='productPrice' name='productPrice' value={productPrice} onChange={e => setProductPrice(e.target.value)}></input><br></br>

                <input type='file' name='photos'  onChange={e => setPhotos(e.target.files[0])} />
                <select name='Category' id='Category'  placeholder=' parentCategory' onChange={e => setCategoryId(e.target.value)}>
                    
          <option>select Category</option>
                    {display.map(m=><option key={m.categoryId} value={m.categoryId}>{m.categoryId}</option>)}
                    </select> 
                    <br></br>
                <button className='add' type='submit'>+</button>
                </div>
                 

            </form>
            </>


        
    )
}
