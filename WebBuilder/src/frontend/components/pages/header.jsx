import { Link, useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { jwtDecode} from "jwt-decode";
import { googleLogout } from '@react-oauth/google';

const Heading = () => {
  const navigate =useNavigate();
  const [currentUser] = useState(()=>{
    const jwtToken = Cookies.get("jwt-authorization");
    if (!jwtToken)
    {
      return "";
    }
    try{
      const decodedToken = jwtDecode(jwtToken);
      return [decodedToken.first_name, decodedToken.last_name, decodedToken.email];
    }catch{
      return "";
    }
  });
  useEffect(()=>{
    if (!currentUser)
    {
      navigate("/");
    } 
  })
  const handleLogout = (e)=>{
    e.preventDefault()
    Cookies.remove("jwt-authorization")
    googleLogout()
  }
  return (
        <header>
            <h1>WebMaker App but in a header</h1>
            <div className='headerLogoutSec' >
              <p>Hello {currentUser[0]} {currentUser[1]}</p>
              <button onClick={handleLogout}><Link to="/">Logout</Link></button>
            </div>

            <nav className="headerNav">
                <Link className="navLink" to="/home">Home</Link>
                <Link className="navLink" to="/editor">Build</Link>
            </nav>
        </header>
    )
}

export default Heading