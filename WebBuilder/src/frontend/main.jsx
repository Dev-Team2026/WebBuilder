import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@measured/puck/puck.css";
import {GoogleOAuthProvider} from "@react-oauth/google"

const CLIENT_ID = "892188936490-emsdisdcj12lmradun03jaqn3ckudq1i.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById('root')).render(<GoogleOAuthProvider clientId={CLIENT_ID} ><App /></GoogleOAuthProvider>)