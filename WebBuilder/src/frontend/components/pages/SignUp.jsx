import { useState } from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useFormik} from "formik"
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


const validate = (values) => {
  const errors = {}
  if (!values.email){
    errors.email = 'Required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)){
    errors.email = 'invalid email address'
  }
  return errors
}

const SignUp = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {first_name: "", last_name: "", password: "", email: ""},
    validate,
    onSubmit: async (values) => {
      try {
        await axios
          .post("http://localhost:3000/users", values)
          .then((response) => {
            setUserPostResponse(response.data.message)
            if (response.status === 201)
            {
              navigate("/home");
              Cookies.set("jwt-authorization", response.data.token);
            }
          })
        //setUserForm({first_name: "", last_name: "", password: "", email: ""})
      } catch (error) {
        console.log(error.message)
      }
    }
  })
  const [userPostResponse, setUserPostResponse] = useState("")
  const [signUpOption, setSignUpOption] = useState("normal")

  const onGoogleSignUpSuccess = async (credentials) => {
    try {
      await axios
        .post("http://localhost:3000/users", {first_name: credentials.given_name, last_name: credentials.family_name, password: "GoogleSignUp", email: credentials.email})
        .then((response) => {
          setUserPostResponse(response.data.message)
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
      {userPostResponse != "" && <p>{userPostResponse}</p>}
      {signUpOption === "google" && <div>
        <GoogleLogin onSuccess={(credentialResponse)=>onGoogleSignUpSuccess(jwtDecode(credentialResponse.credential))} onError={()=> console.log("login failed") } />
        <button onClick={()=>setSignUpOption("normal")} >back</button>
      </div> }
    {signUpOption === "normal" && <div>
      <form onSubmit={formik.handleSubmit}>
        <input 
          type="text"
          id="first_name"
          name="first_name"
          placeholder="First Name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
        />
        <br />
        <input 
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Last Name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
        />
        <br />
        <input 
          type="text"
          id="email"
          name="email"
          placeholder="Email Address"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (<span>{formik.errors.email}</span>) : null}
        <br />
        <input 
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <button onClick={()=>setSignUpOption("google")} >Signup With Google</button>
      </div>}
    </div>
  )
}

export default SignUp