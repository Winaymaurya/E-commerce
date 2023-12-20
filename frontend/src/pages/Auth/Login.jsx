import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from "axios"
import { useNavigate ,useLocation} from 'react-router-dom'
import { useAuth } from "../../context/auth";
import { toast } from 'react-toastify';
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth();
    const navigate=useNavigate()
    const location=useLocation()

    const handelSubmit= async(e)=>{
        e.preventDefault();
        try {
          const payload={email,password}

           const res=await axios.post('http://localhost:8080/api/v1/auth/login' ,
           payload)
     
           if(res.data.success){
             
            toast.success(res.data.message)
             setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
             navigate( location.state || '/')
            }
            else{
              toast.error(res.data.message)

          }
           
          } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong")
         }

    }
  return (
    <>
     <Layout title="E-commerce Login">
    <div className="registerBox">

    
    <h2 className='text-center'>Login</h2>
   <form >
  
  <div className="mb-2">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
  </div>
  <div className="mb-2">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
  </div>
   <div className='forgot' onClick={()=>{navigate('/forgot-password')}}> Forgot Password ?</div>
  <button type="submit" onClick={handelSubmit} className="btn btn-primary">Login</button>
</form>
</div>
    </Layout>
    </>
  )
}

export default Login
