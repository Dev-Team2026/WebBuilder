import { useState } from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {}
  if (!values.email){
    errors.email = 'Required'
  } 
  return errors
}

const LoginPg = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {password: "", email: ""},
    validate,
    onSubmit: async (values) => { 
      try {
        await axios.post("http://localhost:3000/", values)
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
  })
  const [loginResponse, setLoginResponse] = useState("")
  const [loginOption, setLoginOption] = useState("normal")
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
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Enter email"
            required
          />
          {formik.touched.email && formik.errors.email ? (<span>{formik.errors.email}</span>) : null}
          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
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