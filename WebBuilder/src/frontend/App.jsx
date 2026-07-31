import { HashRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react';

{ /* Other page imports go below here */ }
import Landing from './components/pages/landing.jsx'
import Home from './components/pages/home.jsx'
import Layout from "./components/pages/layout.jsx";
import Build from "./components/pages/build.jsx";
import Editor from "./components/pages/editor.jsx";
import SignUp from './components/pages/SignUp.jsx';
import LoginPg from './components/pages/loginPg.jsx';
import AuthenticationChecker from './components/pages/AuthenticationChecker.jsx';


function App() {
  const [currentUser, setCurrentUser] = useState([])
  const updateUser = (user)=>{
    setCurrentUser(user);
  }
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />

        <Route element={<Layout />} >
          <Route path="/home" element={<Home AuthenticationChecker={AuthenticationChecker} currentUser={currentUser} updateUser={updateUser} />} />
          <Route path="/editor" element={<Editor AuthenticationChecker={AuthenticationChecker} updateUser={updateUser} />} />
          <Route path="/build" element={<Build />}/>
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/login" element={<LoginPg/>} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
