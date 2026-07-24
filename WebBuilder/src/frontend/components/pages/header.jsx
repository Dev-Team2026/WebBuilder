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

  const handleLogout = (e)=>{
    e.preventDefault()
    Cookies.remove("jwt-authorization")
    googleLogout()
      navigate("/")
  }

  return (
        <header className="normHeader">
            <h1><Link className="headLink" to="/">WebMaker App but in a header</Link></h1>
            <nav className="headerNav">
                <Link className="navLink" to="/home">Home</Link>
                <Link className="navLink" to="/editor">Build</Link>
                <button className="logOutBtn" onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    )
}

export default Heading