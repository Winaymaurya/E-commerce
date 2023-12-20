import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")

    const navigate=useNavigate()
    const handelSubmit=async (e) =>{
        e.preventDefault();
        try {
          const payload={name,email,password,phone,address,answer}
           const res=await axios.post('http://localhost:8080/api/v1/auth/register' ,
           payload)
           if(res.data.success){
             
             alert(res.data.message)
             navigate('/login')
            }
            else{
            alert(res.data.message)

          }
           
          } catch (error) {
            console.log(error)
            alert("Something Went Wrong")
         }
    }
  return (
    <>
    <Layout title="E-commerce Register">
    <div className="registerBox">

    
    <h2 className='text-center'>Registration</h2>
   <form onSubmit={handelSubmit}>
  <div className="mb-1">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input type="text" className="form-control" id="exampleInputName" value={name} onChange={(e)=>setName(e.target.value)} required />
  </div>
  <div className="mb-1">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
  </div>
  <div className="mb-1">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
  </div>
  <div className="mb-1">
    <label htmlFor="exampleInputPhone" className="form-label">Phone Number</label>
    <input type="text" className="form-control" id="exampleInputPhone"  value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
  </div>
  <div className="mb-1">
    <label htmlFor="exampleInputAdd" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputAdd"  value={address} onChange={(e)=>setAddress(e.target.value)} required/>
  </div>
  <div className="mb-1">
    <label htmlFor="exampleInputAdd" className="form-label">Answer</label>
    <input type="text" className="form-control" id="exampleInputAdd" placeholder='Your favorite movie'  value={answer} onChange={(e)=>setAnswer(e.target.value)} required/>
  </div>
  <button type="submit" className="btn btn-primary">Register</button>
</form>
</div>
    </Layout>
    </>
  )
}

export default Register
