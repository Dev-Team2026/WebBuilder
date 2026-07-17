import { useState } from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({first_name: "", last_name: "", password: "", email: ""})
  const [userPostResponse, setUserPostResponse] = useState("")
  const handleOnChangeUser = (e) => {
    setUserForm({...userForm, [e.target.name]: e.target.value})
  }
  const handleOnSubmitUser = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/users", userForm)
        .then((response) => {
          setUserPostResponse(response.data.message)
          if (response.status === 201)
          {
            navigate("/home");
            Cookies.set("jwt-authorization", response.data.token);
          }
        })
      setUserForm({first_name: "", last_name: "", password: "", email: ""})
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      {userPostResponse != "" && <p>{userPostResponse}</p>}
      <form onSubmit={handleOnSubmitUser}>
        <input 
          type="text"
          id="first_name"
          name="first_name"
          placeholder="First Name"
          value={userForm.first_name}
          onChange={handleOnChangeUser}
        />
        <input 
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Last Name"
          value={userForm.last_name}
          onChange={handleOnChangeUser}
        />
        <input 
          type="text"
          id="email"
          name="email"
          placeholder="Email Address"
          value={userForm.email}
          onChange={handleOnChangeUser}
        />
        <input 
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          value={userForm.password}
          onChange={handleOnChangeUser}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default SignUp