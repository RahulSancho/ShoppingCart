import axios from 'axios';
import React from 'react';

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';


export const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: '',
    phoneNumber: '',
    password: '',
    address: '',
    email: '',
    gender: ''
  })
  const { userId } = useParams();

  useEffect(() => {
    console.log(location)
    if (location.state) {
      setRegister(location.state.register)
    }
  }, [location])

  const changeHandler = (e) => {
    setRegister(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userId) {
      axios.put(`http://localhost:8080/user/update/${userId}`, register).then((res) => {
        console.log(res.data);
        navigate("/Users")
      }).catch(err => console.log(err));
    }
    else {
      axios.post('http://localhost:8080/user/post',register).then(res => {
        console.log(res.data);
        navigate("/Users")
      })
    }

  }
  return (
    <>
      <div className='auth-form-container App'>
        <h1>REGISTER</h1>
        <form className='register-form' onSubmit={handleSubmit}>
          <input type="text" placeholder="name" name="name" value={register.name} onChange={changeHandler}></input>
          <input type="text" placeholder="email" name="email" value={register.email} onChange={changeHandler}></input>
          <input type="text" placeholder="gender" name="gender" value={register.gender} onChange={changeHandler}></input>
          <input type="text" placeholder="address" name="address" value={register.address} onChange={changeHandler}></input>
          <input type="text" placeholder="phoneNumber" name="phoneNumber" value={register.phoneNumber} onChange={changeHandler}></input>
          <input type="text" placeholder="password" name="password" value={register.password} onChange={changeHandler}></input>
          <button type='submit'> Log in</button>
        </form>
        <Link to={"/login"}>
          <button className='link-button' >Already hava an account? Login Here</button>
        </Link>
      </div>
    </>
  )
}
