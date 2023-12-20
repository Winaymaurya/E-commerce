
import { Routes,Route } from "react-router-dom"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Policy from "./pages/Policy"
import About from "./pages/About"
import PageNotFound from "./pages/PageNotFound"
import Register from "./pages/Auth/Register"
import Login from "./pages/Auth/Login"
import Dashboard from "./user/Dashboard"
import PrivateRoute from "./components/layout/Routes/Private"
import ForgotPassword from "./pages/Auth/ForgotPassword"
import AdminRoute from "./components/layout/Routes/AdminRoute"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import CreateCategory from "./pages/Admin/CreateCategory"
import CreateProduct from "./pages/Admin/CreateProduct"
import Users from "./pages/Admin/Users"
import Order from "./user/Order"
import Profile from "./user/Profile"
import Products from "./pages/Admin/Products"
import UpdateProducts from "./pages/Admin/UpdateProducts"
import ProductsDetails from "./pages/ProductsDetails"
import Categories from "./pages/Categories"
import CategoryProduct from "./pages/CategoryProduct"
import CartPage from "./pages/CartPage"

function App() {
              

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:slug" element={<ProductsDetails/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/category/:slug" element={<CategoryProduct/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        {/* user */}
        <Route  path="/dashboard" element={<PrivateRoute/>}>
               <Route path="user" element={<Dashboard/>}/>
               <Route path="user/orders" element={<Order/>}/>
               <Route path="user/profile" element={<Profile/>}/>

        </Route>
        {/* admin */}
        <Route path='/dashboard' element={<AdminRoute/>}>
              <Route path="admin" element={<AdminDashboard/>}/>
              <Route path="admin/create-category" element={<CreateCategory/>}/>
              <Route path="admin/create-product" element={<CreateProduct/>}/>
              <Route path="admin/product/:slug" element={<UpdateProducts/>}/>
              <Route path="admin/products" element={<Products/>}/>
              <Route path="admin/users" element={<Users/>}/>
        </Route>

        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/Policy" element={<Policy/>}/>
        <Route path="/*" element={<PageNotFound/>}/>
    
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
