
import './App.css';
import Home from './Component/Home';
import { Products } from './Component/Products';
import {Cart} from './Userview/Cart'
import { Orders } from './Component/Orders'



import { Login } from './Login';
import { Register } from './Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Categories } from './Component/Categories';

import { Users } from './Component/Users';
import { Addproducts } from './Component/Addproducts';

import { AddCategories } from './Component/AddCategories';
import  {CategoriesUser}  from './Userview/CategoriesUser';
import { ProductsUser } from './Userview/ProductsUser';
import { Order } from './Userview/Order';
import Userview from './Component/Userview';
import { Payment } from './Userview/Payment';
import {Invoice} from './Userview/Invoice';








function App() {
  return (
    <div>

      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/categories' element={<Categories />} />
         
          <Route path='/users' element={<Users />} />
          <Route path='/addproducts' element={<Addproducts />} />
          <Route path='/edit-product/:productId' element={<Addproducts />} />
       
          <Route path='/addcategories' element={<AddCategories />} />
          <Route path='/edit-category/:categoryId' element={<AddCategories />} />
          <Route exact path='/edit-user/:userId' element={<Register />} />
          <Route path='/categoriesuser' element={<CategoriesUser/>}/>
          <Route path='/productsuser' element={<ProductsUser/>}/>
          <Route path='/ordersuser' element={<Order/>}/>
          <Route path='/ordersuser/cartuser' element={<Cart/>}/>
          <Route path='/userview' element={<Userview/>}/>
          <Route path='/paymentuser' element={<Payment/>}/>
          <Route path='/invoiceuser' element={<Invoice/>}/>

          



         


        
      

        </Routes>
      </BrowserRouter>



    </div>
  );
}

export default App;
