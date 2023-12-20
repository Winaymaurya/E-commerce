import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";

const Layout = (props) => {
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>{props.title}</title>
                
            </Helmet>
      <Header/>

      <main >
   
      {props.children}

      </main>
      <Footer/>
    </>
  )
}

export default Layout
