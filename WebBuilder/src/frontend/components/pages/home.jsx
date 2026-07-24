import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom'

function TitleChange() {
    useEffect(() => {
        document.title = 'Dashboard';
        document.body.style.overflow = "hidden";
    }, []);
}

const Home = () => {
    TitleChange();

    const navigate =useNavigate();

    const [currentUser] = useState(()=>{

        const jwtToken = Cookies.get("jwt-authorization");

        if (!jwtToken)
        {
            return "";
        }
        try{
            const decodedToken = jwtDecode(jwtToken);
            return [decodedToken.first_name, decodedToken.last_name, decodedToken.email];
        }catch{
            return "";
        }
    });

    useEffect(()=>{
        if (!currentUser)
        {
            navigate("/");
        }
    })

    return (
        <div className="userDash">
            <div className="dashBoard">
                <h2>Hello {currentUser[0]} {currentUser[1]}</h2>
                <div className="prevWebs">
                    <h3>Previous Websites</h3>
                    <ul>
                        {/* Fill Data from Server.js */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home