import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {useFormik} from "formik"
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


function TitleChange() {
    useEffect(() => {
        document.title = 'Sign Up';
    }, []);
}

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
    TitleChange()
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
        .post("http://localhost:3000/google-login", {first_name: credentials.given_name, last_name: credentials.family_name, email: credentials.email})
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
    <div className="logSignPage">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="first_name">First Name</label>
        <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First Name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
        />
        <br/>
        <label htmlFor="last_name">Last Name</label>
        <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
        />
        <br/>
        <label htmlFor="email">Email</label>
        <input
            type="text"
            id="email"
            name="email"
            placeholder="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (<span>{formik.errors.email}</span>) : null}
        <br/>
        <label htmlFor="password">Password</label>
        <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
        />
        <br/>
        <button type="submit" className="logSignBtn">Register</button>
      </form>
      <div className="googleWrapper">
        <GoogleLogin onSuccess={(credentialResponse)=>onGoogleSignUpSuccess(jwtDecode(credentialResponse.credential))} onError={()=> console.log("login failed") } />
      </div>
      <p>Already have an account? <Link to="/login">Log In</Link> Instead</p>
      </div>
  )
}

export default SignUp