import React, {use, useEffect, useState} from 'react';
import Cookies from "js-cookie";
import { jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function TitleChange() {
    useEffect(() => {
        document.title = 'Dashboard';
        document.body.style.overflow = "hidden";
    }, []);
}

const Home = () => {
    TitleChange();
    const navigate =useNavigate();
    const [websites, setWebsites] = useState([])
    const [webName, setWebName] = useState("")


    const [currentUser] = useState(()=>{

        const jwtToken = Cookies.get("jwt-authorization");

        if (!jwtToken)
        {
            return "";
        }
        try{
            const decodedToken = jwtDecode(jwtToken);
            return decodedToken;
        }catch{
            return "";
        }
    });

    async function newWebsite() {
        console.log("Current user:", currentUser);

        try {
            const response = await axios.post(
                "http://localhost:3000/websites",
                {
                    user_id: currentUser.user_id,
                    website_name: webName,
                    website_data: JSON.stringify({
                        root: {},
                        content: []
                    })
                }
            );

            navigate(`/editor/${response.data.website_id}`);

        } catch(error) {
            console.log(error.message);
        }
    }

    async function sendData() {
        try {
            const response = await axios.get(
                `http://localhost:3000/websites/${currentUser.user_id}`
            );

            setWebsites(response.data);

        } catch(error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        if (!currentUser)
        {
            navigate("/");
        } else {
            sendData()
        }
    }, [currentUser]);

    return (
        <div className="userDash">
            <div className="dashBoard">

                <div className="dashHeader">
                    <div>
                        <h2>
                            Hello {currentUser.first_name} {currentUser.last_name}
                        </h2>
                        <p>Manage your websites</p>
                    </div>

                    <div className="createWebsite">
                        <input
                            placeholder="Website name..."
                            onChange={(e) => setWebName(e.target.value)}
                            type="text"
                        />

                        <button onClick={newWebsite}>
                            + Create Website
                        </button>
                    </div>
                </div>


                <div className="prevWebs">
                    <h3>Your Websites</h3>

                    <div className="webGrid">
                        {websites.map(website => (
                            <div
                                key={website.website_id}
                                className="webList"
                                onClick={() => navigate(`/editor/${website.website_id}`)}
                            >
                            <span>
                                {website.website_name}
                            </span>

                                <button
                                    className="webBtn"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        { /* delete website db.function here */ }
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Home