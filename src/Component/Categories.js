import axios from 'axios'
import React, { Component, useEffect, useState } from 'react'
import _, { result } from 'lodash'
import './CategoriesStyles.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Autocomplete, Button, Modal } from '@mui/material'
import { FaEdit, FaTrash } from "react-icons/fa";
import GroupedSelect from './Dropdown'


export const Categories = () => {
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState([]);
  const [Layout, setLayout] = useState([]);
  const [innerLayout, setInnerLayout] = useState([]);
  const [filterResult, setFilterResult] = useState([]);
  const [catName,setCatName] = useState([]);

  useEffect(() => {
    getCategories();
  }, [])

  useEffect(() => {
    getCategory()
  }, [categories])
  
  const getCategories = () => {
    axios.get('http://localhost:8080/categories/get')
      .then(response => {
        setCategories(response.data)
        setSearch(response.data)
        const cat = _.map(response.data || [], c => ({ ...c, path: groupingCat(response.data, c) }))
        let catNames = []
        const categoryName = _.map(response.data, c => {
          let name= {};
          name.label = c.categoryName;
          name.id = c.categoryId;
          catNames.push(name)
        })
        setCatName(catNames);
        setCategories(cat)
        setFilterResult(cat)
        console.log(cat);
      })
      .catch(error => {
        console.log(error)

      })
  }

  const groupingCat = (categories, category, arr = []) => {
    arr = _.concat(category.categoryName, arr)
    if (category.parentCategory) {
      const cat = _.find(categories, c => String(c.categoryId) === category.parentCategory)
      if (!cat.parentCategory) {
        return _.concat(cat.categoryName, arr)
      }
      else return groupingCat(categories, cat, arr)
    }
    return arr;
  }

  const deleteCategories = (categoryId) => {
    axios.delete(`http://localhost:8080/categories/delete/${categoryId}`)
      .then(response => {
        getCategories();
      })
      .catch(error => {
        console.log(error);
      })

  }


  const getCategory = () => {
    // if (event.target.value === 'all') {
    //   return setFilterResult(categories)
    // }
    // let cat = _.filter(categories, c => c.path?.includes(event.target.value))
    // setFilterResult(cat)
    let cat = _.filter(categories, c => c.path.length === 1)
    console.log(cat, categories);
    setFilterResult(cat)

  }
  const getLayout = (e, r) => {
    // console.log(r)
    e?.preventDefault()
    let cat = _.filter(categories, c => c.path.includes(r.categoryName) && c.parentCategory === r.categoryId?.toString())
    console.log(cat, categories, r);
    setLayout(cat);

  }

  const getInnerLayout = (e, r) => {
    e?.preventDefault()
    let cat = _.filter(categories, c => c.path.includes(r.categoryName) && c.parentCategory === r.categoryId.toString())
    console.log(cat, categories, r)

    setInnerLayout(cat);

  }




  return (
    <>
      {<GroupedSelect data = {catName}/>}
      <div>
        {
          _.map(filterResult, (r) => <Link onClick={(e) => getLayout(e, r)} >{r.categoryName}<br /></Link>)
        }
      </div>
      <div>
        {_.map(Layout, (r) =>
          <Link onClick={(e) => getInnerLayout(e, r)}>{r.categoryName}<br /></Link>)
        }
        {_.map(innerLayout, l => {
          return <p>{l.categoryName}</p>
        })}
      </div>
      <div>
     {filterResult.map(p =>
      <Link to={`/edit-category/${p.categoryId}`} state={{ store: p }} title="edit"><button > <FaEdit /></button></Link>)
     }
      </div>

      {/* <div className='Categories'>

        <Button variant='outlined' className='primary' style={{ borderRadius: '20px', backgroundColor: '#1DA1F2' }}><Link className='plink' to='/addcategories'>Add Categories</Link></Button>

        <select className='drops' onChange={(e) => getCategory(e)} >
          <option selected value={'all'}>ALL</option>
          <option value={'Electronics'} >

            Electronics</option>
          <option value={'FASHIONS'} >Fashion</option>
          <option value={'FURNITURES'} >Furniture</option>
        </select>
        <table className='categoryTable'>
          <thead>
            <th>S.NO</th>

            <th>CATEGORYNAME</th>

            <th>ACTION</th>

          </thead>
          <tbody>{
            filterResult.map((p, indx) =>
              <tr key={p.categoryId}>


                <td>{indx + 1}</td>

                <td>{p.categoryName}</td>

                <td> <Link to={`/edit-category/${p.categoryId}`} state={{ store: p }} title="edit"><button className='actionBtn'> <FaEdit /></button></Link>
                  <button className='actionBtn' onClick={() => deleteCategories(p.categoryId)} title='delete'> <FaTrash /></button></td>
              </tr>
            )
          }
          </tbody>

        </table>
      </div> */}


    </>)



}
