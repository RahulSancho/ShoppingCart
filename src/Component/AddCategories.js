import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './AddCategoriesStyles.css'

export const AddCategories = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [addCategories, setAddCategories] = useState({

        categoryName: '',
        typeOfCategory: ''
    })
    const[display,setDisplay]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8080/categories/get')
        .then(response=>{
            setDisplay(response.data);
            console.log(response.data);

        })
    })
   
    useEffect(() => {
        console.log(location)
        if (location.state?.store) {
            setAddCategories(location.state.store)

        }
    }, [])

    

    const changeHandler = (e) => {
        setAddCategories(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const handleSubmit = (e) => {
        e.preventDefault()
         axios.post('http://localhost:8080/categories/post', addCategories)
                .then(res => {
                    console.log(res.data);
                    navigate("/Categories")
                })
                .catch(error => {
                    console.log(error);
                })

        }
    
    return (
        <div><h1>AddCategories</h1>
            <form className='add-categories' onSubmit={handleSubmit}>

               
            <select name="categoryName" id="name" onChange={changeHandler}>
                {display.map(m=><option key={m.categoryId} value={m.categoryId}>{m.categoryName}</option>)}
</select>
                <input type='text' placeholder='typeOfCategory' name='typeOfCategory' value={addCategories.typeOfCategory} onChange={changeHandler}></input>
                <button className='add' type='submit'>{addCategories.categoryId?"update":"Add Categories"}</button>
            </form>
        </div>
    )
}
