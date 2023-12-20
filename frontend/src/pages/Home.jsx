import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/Layout'
import { Checkbox, Radio } from "antd";

import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Prices } from '../components/Prices';
import { useCart } from '../context/Cart';
import { toast } from 'react-toastify';

const Home = () => {
 const navigate=useNavigate()
 const [cart,setCart]=useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
const [total, setTotal] = useState(0)
const [page,setPage]=useState(1)
const [checked,setChecked]=useState([])
const [radio,setRadio]=useState([])
const [loading,setLoading]=useState(false)

// filter by Category
const handleFilter=(value,id)=>{
   let all =[...checked]
   if(value){
    all.push(id)
   }
   else{
    all=all.filter(c=> c!==id)
   }
   setChecked(all)
 

}
  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts=async()=>{
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(()=>{

   if(!checked.length || !radio.length)getAllProducts()
  
  },[checked.length,radio.length])
  useEffect(()=>{

   if(checked.length || radio.length)filterProduct()
  
  },[checked,radio])


   //getTOtal COunt
   const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

 //get filterd product
 const filterProduct = async () => {
  try {
    const { data } = await axios.post("http://localhost:8080/api/v1/product/product-filters", {
      checked,
      radio,
    });
    setProducts(data?.products);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <Layout title="E-commerce All products">
        <div className="row mt-3 w-100" >
          <div className="col-md-3">
            <h5 className='text-center mt-3'>Filter by Category</h5>
            <div className="d-flex flex-column m-3">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
             {/* price filter */}
             <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column m-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className='btn btn-danger m-3' onClick={()=>window.location.reload()}>RESET FILTERS</button>
          </div>
          </div>
          <div className="col-md-9  w-80" >
            <h2> All Products</h2>
            <div className="d-flex flex-wrap" >
      
              {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img  style={{width:"200px",height:"200px ", marginLeft:"44px",marginTop:"10px"}}
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top text-center"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                  <button class="btn btn-secondary ms-1"
                   onClick={()=>{setCart([...cart,p])
                  toast.success("Item added to Cart")}}
                   >ADD TO CART</button>
                </div>
              </div>
            ))}
            </div>
            <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load more"}
              </button>
            )}
          </div>
          </div>
        </div>
    </Layout>
  )
}

export default Home
