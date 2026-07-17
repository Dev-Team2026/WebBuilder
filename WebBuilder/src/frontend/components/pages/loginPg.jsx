import { useState } from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const LoginPg = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const [loginResponse, setLoginResponse] = useState("")
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
      const response = await axios.post("http://localhost:3000/", loginData);
      setLoginResponse(response.data.message);
      if (response.status === 201)
      {
        navigate("/home");
        Cookies.set("jwt-authorization", response.data.token);
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      {loginResponse != "" && <p>{loginResponse}</p>}
      <br />
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
    </div>
  )
}

export default LoginPg