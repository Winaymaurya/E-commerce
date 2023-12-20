import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
const Products = () => {
    const [products,setProducts]=useState([])

    const getAllProduct=async()=>{
          try {
            const {data}=await axios.get('http://localhost:8080/api/v1/product/get-product')
            setProducts(data.products)
          } catch (error) {
            toast.error("Something went Wrong")
            console.log(error)
          }
    }
    useEffect(()=>{
        getAllProduct()
    },[])
  return (
  
    <Layout title="E-commerce Products">
        <div className="container-fluid mt-3 p-3 ">
    <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9 w-75">
            <h2 > All Products</h2>
            <div className="product-box">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "15rem" ,fontSize:"14px"}}>
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
    </div>
    </div>
    </Layout>
  )
}

export default Products
