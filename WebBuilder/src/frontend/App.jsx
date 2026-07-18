import { HashRouter, Route, Routes } from 'react-router-dom'

const sharedVars = {
  fontColor: "--font-color",
  headingFontSize: "--heading-font-size",
  paragraphFontSize: "--paragraph-font-size"
}

{ /* Other page imports go below here */ }
import Home from './components/pages/home.jsx'
import Layout from "./components/pages/layout.jsx";
import Build from "./components/pages/build.jsx";
import Editor from "./components/pages/editor.jsx";
import Login from "./components/pages/login.jsx";


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />}/>
          <Route path="/editor" element={<Editor/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>
          <Route path="/build" element={<Build />}/>
      </Routes>
    </HashRouter>
  )
}

export default App
