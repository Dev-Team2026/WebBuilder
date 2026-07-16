import { HashRouter, Route, Routes } from 'react-router-dom'

{ /* Other page imports go below here */ }
import Landing from './components/pages/landing.jsx'
import Home from './components/pages/home.jsx'
import Layout from "./components/pages/layout.jsx";
import Build from "./components/pages/build.jsx";
import Editor from "./components/pages/editor.jsx";


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />

        <Route element={<Layout />} >
          <Route path="/home" element={<Home />}/>
          <Route path="/editor" element={<Editor/>}/>
        </Route>

          <Route path="/build" element={<Build />}/>
      </Routes>
    </HashRouter>
  )
}

export default App
