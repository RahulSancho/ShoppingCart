import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import './AddCategoriesStyles.css'
import { FaArrowAltCircleLeft } from "react-icons/fa";



export const AddCategories = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [addCategories, setAddCategories] = useState({

        categoryName: '',
        parentCategory: ''
    })
    const [display, setDisplay] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/categories/get')
            .then(response => {
                setDisplay(response.data);
                console.log(response.data);

            })
    }, [])

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
            <Button variant='outlined' className='primary' style={{ borderRadius: '20px', backgroundColor: ' #1DA1F2' }}><Link className='back' to='/home'><FaArrowAltCircleLeft />BACK</Link></Button>
            <form className='add-categories' onSubmit={handleSubmit}>
                <input type='text' placeholder='categoryName' name='categoryName' value={addCategories.categoryName} onChange={changeHandler}></input>

                {/* < select name="parentCategory" id="parentCategory" onChange={changeHandler}>
                    {display.map(m => <option key={m.categoryId} value={m.categoryId}>{m.parentCategory}</option>)}
                </select> */}
                <input id='data'  name="parentCategory" onChange={changeHandler}></input>
                <datalist id='data'> {display.map(m => <option key={m.categoryId} value={m.categoryId}>{m.parentCategory}</option>)}</datalist>

                <button className='add' type='submit'>{addCategories.categoryId ? "update" : "Add Categories"}</button>
            </form>
        </div>
    )
}
