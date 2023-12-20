import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import useCategory from '../hooks/useCategory'
const Categories = () => {
    const categories=useCategory()
  return (
    <Layout title="E-Commerce Categories">
      <h2>All Categories</h2>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-2 mt-5 mb-3 " key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories
