import React,{useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer '
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../reducer/authSlice'

const Login = () => {
    const user = useSelector((state)=> state.user)
     console.log(user)
    const dispatch = useDispatch()

    const [values,setValues]= useState({
        email:'',
        password:'',
        error:'',
        success:false
    })
    const{email,password,error,success}=values
    
    const handleChange=e=>{
        const name = e.target.name
        const value = e.target.value
        setValues({...values, error:false, [name]:value}) 
    }
    const handleSubmit =e=>{
        e.preventDefault()
        setValues({...values, error:false})
        //signup
        //signup({name,username,email,password})
        dispatch(userLogin(values))
        
    }
    // to show error message
    const showError=()=>(
       <div className='alert alert-danger' style={{ display:error?'':'none' }}>
        {error}
       </div> 
      )
        // to show success
    const showSuccess=()=>(
        
        <div className='alert alert-success' style={{ display:success?" ":'none' }}>
        <span>user registration successful, verify your email before login</span>
       </div> 
     )
    return (

    <>
    <Header/>
         <div className="container">
        <div className="d-flex justify-content-center">
            <div className="col-md-7 mt-4 mb-3 p-3 shadow-lg">
                <form>
                    {showError()}
                    {showSuccess()}

                    <div className="col-12 mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="example@gmail.com" className="form-control" onChange={handleChange} value={values.email} />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="***********" className="form-control" onChange={handleChange} value={values.password} />
                    </div>
                   
                    <div className="col-6">
                        <button className="btn btn-primary form-control" onClick={handleSubmit}>Signup</button>
                    </div>
                    {user.status === "pending" ? "Submitting..." : "Register"}
        
        {user.status === "rejected" ? (
          <p>{user.error}</p>
        ) : null}
                </form>
            </div>
        </div>
    </div>
    <Footer />
    </>
  )

}

export default Login
