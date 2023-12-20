import React from 'react'
import Layout from '../components/layout/Layout'
import UserMenu from '../components/layout/UserMenu'

const Order = () => {
  return (
    <Layout title="E-commerce User Order">
      <div className="container-fluid p-3 mt-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Order
