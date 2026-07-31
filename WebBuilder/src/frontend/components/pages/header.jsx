import { Link, useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
import { googleLogout } from '@react-oauth/google';

const Heading = () => {
  const navigate =useNavigate();

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