import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const ProductsDetails = () => {
 const params=useParams()
 const [product,setProduct]=useState({})
//  const [id,setId]=useState()
const [similarProducts,setSimilarProducts]=useState([])
 
 
    useEffect(()=>{
        if(params?.slug){
            getProduct();
        }
    },[])

    const getProduct=async()=>{
        try {
            const {data}= await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`)
            
            setProduct(data?.product)
       
            getSimilarProducts(data?.product._id,data?.product.category._id)
          
        } catch (error) {
            console.log(error)
        }
    }
    const getSimilarProducts=async(pid,cid)=>{
        try {
            const {data}=await axios.get(`http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`)
            setSimilarProducts(data?.products)
            console.log(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout title ={`E-Commerce ${params.slug}`}>
     
        <div className="row container mt-5" >
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top"
            alt={product?.name}
             style={ {width:"250px" , height:"250px",marginLeft:"150px"}}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="">Product Details</h1>
          <h6 className='m-3'>Name : {product?.name}</h6>
          <h6 className='m-3'>Description : {product?.description}</h6>
          <h6 className='m-3'>Price : $ {product?.price}</h6>
          <h6 className='m-3'>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-3">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h5>Similar Products</h5>
        {similarProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {similarProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
                style={ {width:"150px" , height:"150px",marginLeft:"50px"}}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {p.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button class="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ProductsDetails
