import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import './UsersStyles.css'



export const Users = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUsers();

  }, [])
  const getUsers = () => {
    axios.get('http://localhost:8080/user/get')
      .then(res => {
        setUser(res.data)
        console.log(res);
      })
      .catch(error => {
        console.log(error)
      })

  }

  const deleteUsers = (userId) => {
    axios.delete(`http://localhost:8080/user/delete/${userId}`)
      .then(response => {
        getUsers();
      }
      )
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <>
      

      <table className='userTable'>
        <thead>

        
          <th>USERNAME</th>
          <th>PHONENUMBER</th>
          <th>PASSWORD</th>
          <th>ADDRESS</th>
          <th>EMAIL</th>
          <th>GENDER</th>
         
          <th>ACTION</th>

        </thead>
        <tbody>
          {
            user.map(p =>
              <tr key={p.userId}>

                
                <td>{p.name}</td>
                <td>{p.phoneNumber}</td>
                <td>{p.password}</td>
                <td>{p.address}</td>
                <td>{p.email}</td>
                <td>{p.gender}</td>
               
                <td><Link to={`/edit-user/${p.userId}`}><button className='actionBtn' title='update'><FaEdit/></button></Link>
                  <button className='actionBtn' type="submit" value="Delete" onClick={() => deleteUsers(p.userId)}><FaTrash/></button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </>

  )

}
