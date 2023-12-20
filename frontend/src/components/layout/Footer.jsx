import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className=' foot'>
      <h5 className='text-center'>All Right Reserved &copy; Winaymaurya</h5>

      <p className="text-center mt-1">
      <Link to="/about"> About</Link>|
      <Link to="/policy"> Privacy Policy</Link>|
      <Link to="/contact"> Contact</Link>
      </p>
    </div>
  )
}

export default Footer
