import React, { Component, useEffect, useState } from 'react'
import _ from 'lodash';
import axios from 'axios';
import { Link} from 'react-router-dom'
import CategoryDropDown from './CategoryDropdown';
import GroupedSelect from '../Component/Dropdown'








export const CategoriesUser = () => {
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState([]);
    const [Layout, setLayout] = useState([]);
    const [innerLayout, setInnerLayout] = useState([]);
    const [filterResult, setFilterResult] = useState([]);
    const [catName,setCatName] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


  
    useEffect(() => {
      getCategories();
    }, [])
  
    useEffect(() => {
      getCategory()
    }, [categories])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
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
          // console.log(cat);
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
    const getCategory = () => {
        let cat = _.filter(categories, c => c.path.length === 1)
        // console.log(cat, categories);
        setFilterResult(cat)
    
      }
      const getLayout = (e, r) => {
        // console.log(r)
        e?.preventDefault()
        let cat = _.filter(categories, c => c.path.includes(r.categoryName) && c.parentCategory === r.categoryId?.toString())
        // console.log(cat, categories, r);
        setLayout(cat);
    
      }
    
      const getInnerLayout = (e, r) => {
        e?.preventDefault()
        let cat = _.filter(categories, c => c.path.includes(r.categoryName) && c.parentCategory === r.categoryId.toString())
        // console.log(cat, categories, r)
    
        setInnerLayout(cat);
    
      }
      return (
        <>
           {<GroupedSelect data = {catName}/>}
        <CategoryDropDown open={open} handleClick={() => handleClick()} handleClose={() => handleClose()} category={filterResult} />
       
          <div>
            <div >{
              _.map(filterResult, (r) => <Link className='mainCategory' onClick={(e) => getLayout(e, r)} >{r.categoryName}<br /></Link>)
            }
            </div>
          </div>
          <div>
            {_.map(Layout, (r) =>
              <Link className='subCategory' onClick={(e) => getInnerLayout(e, r)}>{r.categoryName}<br /></Link>)
            }
            {_.map(innerLayout, l => {
              return <p>{l.categoryName}</p>
            })}
          </div>
          <div>
         {/* {filterResult.map(p =>
          <Link to={`/edit-category/${p.categoryId}`} state={{ store: p }} title="edit"><button > <FaEdit /></button></Link>)
         } */}
          </div>
          
    </>)
}