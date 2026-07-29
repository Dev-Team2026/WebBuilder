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

const Home = ({currentUser, updateUser, AuthenticationChecker}) => {
    TitleChange();

    return (
        <div className="userDash">
            <AuthenticationChecker updateUser={updateUser} />
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