import { useState } from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

const LoginPg = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const [loginResponse, setLoginResponse] = useState("")
  const [loginOption, setLoginOption] = useState("normal")
  const handleOnChangeLogin = (e)=> {
    setLoginData((prevData) => {
      return{...prevData, [e.target.name]: e.target.value};
    })
  }
  const handleOnSubmitLogin = (e) => {
    e.preventDefault()
    handleLogin()
    setLoginData({email: "",password: ""})
  }
  const handleLogin = async () => {
    try {
      console.log("test")
      await axios.post("http://localhost:3000/", loginData)
        .then((response)=>{
        setLoginResponse(response.data.message);
        if (response.status === 201)
        {
          navigate("/home");
          Cookies.set("jwt-authorization", response.data.token);
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  const onGoogleLoginSuccess = async (credentials) => {
    try {
      await axios
        .post("http://localhost:3000/", {first_name: credentials.given_name, last_name: credentials.family_name, password: "GoogleSignUp", email: credentials.email})
        .then((response) => {
          setLoginResponse(response.data.message)
          if (response.status === 201)
          {
            navigate("/home");
            Cookies.set("jwt-authorization", response.data.token);
          }
        })
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      {loginResponse != "" && <p>{loginResponse}</p>}
      <br />
      {loginOption === "google" && <div>
        <GoogleLogin onSuccess={(credentialResponse)=>onGoogleLoginSuccess(jwtDecode(credentialResponse.credential))} onError={()=> console.log("login failed") } />
        <button onClick={()=>setLoginOption("normal")} >back</button>
      </div> }
      {loginOption === "normal" && <div>
        <form onSubmit={handleOnSubmitLogin}>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            id="email"
            value={loginData.email}
            onChange={handleOnChangeLogin}
            placeholder="Enter email"
            required
          />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={loginData.password}
            onChange={handleOnChangeLogin}
            placeholder="Enter password"
            required
          />
          <br />
          <button type="submit" >Login</button>
        </form> 
        <button onClick={()=>setLoginOption("google")} >Login With Google</button>
      </div>}
    </div>
  )
}

export default LoginPg