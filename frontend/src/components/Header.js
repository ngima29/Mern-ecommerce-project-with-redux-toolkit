import React from 'react'
import{Link, useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
const Header = () => {
  const user = useSelector((state)=>state.user)
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" >
 <div className="container">
  <div className="w-100 d-flex justify-content-between">
   <div>
     <i className="fa-solid fa-envelope text-light navContact-info me-2"></i>
     <Link to="" className="navbar-sm-brand text-light text-decoration-none
            contact-info me-4">
          info@kinnuhos.com
     </Link>
     <i className="fa-solid fa-phone contact-info text-light me-2"></i>
     <Link to="" className="navbar-sm-brand text-white text-decoration-none
            contact-info">
          01-789655
     </Link>
   </div>
          <div>
            <Link to="" className="text-white">
                <i className="fa-brands fa-facebook me-4"></i></Link>
            <Link to="" className="text-white">
                <i className="fa-brands fa-instagram me-4"></i></Link>
            <Link to="" className="text-white">
                <i className="fa-brands fa-linkedin me-4"></i></Link>
            <Link to="" className="text-white">
                <i className="fa-brands fa-twitter me-2"></i></Link>
               
         
          </div> 
          {user._id ?<div>
        <Link className=" text-white me-4 text-decoration-none"  to="#">
                    Logout
          </Link>
          </div>:<div>
          <Link className=" text-white me-4 text-decoration-none"  to="#">
                    Register
                </Link>
              
                <Link className=" text-white me-4 text-decoration-none"  to="#">
                    Login
                </Link>
          </div>
        }
        </div>
        
      </div>
    </nav>

    <nav className="navbar navbar-expand-lg bg-light">
    <div className="container d-flex justify-content-between">
      <div>
        <h1 className="text-success">KINNUHOS</h1>
      </div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item nav-items">
                <Link className="nav-link nav-links" ria-current="page" to="#">
                    Home
                </Link>
              </li>
              <li className="nav-item nav-items">
                <Link className="nav-link nav-links" to="#">About</Link>
              </li>
              <li className="nav-item nav-items">
                <Link className="nav-link nav-links" to="#">Shop</Link>
              </li>
              <li className="nav-item nav-items">
                <Link className="nav-link nav-links" to="#">Contact</Link>
              </li>
            </ul>
            <div className="position-relative">
              <Link to="" className="text-decoration-none text-dark me-4">
                <i className="fa-solid fa-magnifying-glass nav-icon "></i>
              </Link>
              <Link to="" className="text-decoration-none text-dark me-4">
                <i className="fa-solid fa-cart-arrow-down nav-icon"></i>
              </Link>
            </div>
            
           
          </div>
        </div>
      </nav>
    </div>
  </nav>

    </>
  )
}

export default Header
