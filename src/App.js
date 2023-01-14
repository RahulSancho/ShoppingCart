
import './App.css';
import Home from './Component/Home';
import { Products } from './Component/Products';
import {Cart} from './Component/Cart'
import { Orders } from './Component/Orders'



import { Login } from './Login';
import { Register } from './Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Categories } from './Component/Categories';
import {Payments} from './Component/Payments';
import { Users } from './Component/Users';
import { Addproducts } from './Component/Addproducts';
import Invoice from './Component/Invoice';
import { AddCategories } from './Component/AddCategories';






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
          <Route path='/payments' element={<Payments />} />
          <Route path='/users' element={<Users />} />
          <Route path='/addproducts' element={<Addproducts />} />
          <Route path='/edit-product/:productId' element={<Addproducts />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='/addcategories' element={<AddCategories />} />
          <Route path='/edit-category/:categoryId' element={<AddCategories />} />
          <Route exact path='/edit-user/:userId' element={<Register />} />
      

        </Routes>
      </BrowserRouter>



    </div>
  );
}

export default App;
