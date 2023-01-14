import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className='auth-form-container App'>
        <h1>LOGIN</h1>
        <form className='login-form' >
          <label> Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='youremail@gmail.com' />
          <label> Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password' />
          <Link to={"/home"}><button type='submit'> Log in</button></Link>
        </form>
        <Link to={"/register"}>
          <button className='link-button'>Don't hava an account? Register Here</button>
        </Link>
      </div>
    </>
  )
}
