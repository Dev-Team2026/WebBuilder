import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { jwtDecode} from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

function TitleChange() {
    useEffect(() => {
        document.title = 'Dashboard';
        document.body.style.overflow = "hidden";
    }, []);
}

//Should be made into a component later
function SiteCard({site_id, name}){
    return (
        <li key={site_id}>
            {/*Pass site id as a prop to the editor*/}
            <Link className="navLink" to="/editor" state={{siteId: site_id}}>
                {name} (Click to Edit!)
            </Link>
        </li>
    )
}

const Home = ({currentUser, updateUser, AuthenticationChecker}) => {
    TitleChange();
    const [loading, setLoading] = useState(true)
    const [siteList, setSiteList] = useState(null)

    //load user site list
    useEffect(() => {
        //get user id from currentUser
        const userId = currentUser[3]

        async function loadSiteList() {
            try {
                await axios.get("http://localhost:3000/list", {
                    params: {
                        id: userId
                    }
                }
                )
                .then((response)=>{
                    setSiteList(response.data)
                    setLoading(false)
                })
            } 
            catch(error) {
                console.log(error.message)
            }
        }
        loadSiteList()
        //currentUser must load first
    }, [currentUser])

    return (
        <div className="userDash">
            <AuthenticationChecker updateUser={updateUser} />
            <div className="dashBoard">
                <h2>Hello {currentUser[0]} {currentUser[1]}</h2>
                <div className="prevWebs">
                    <h3>Previous Websites</h3>
                    <ul>
                        {loading ? <li>Loading...</li> : siteList.map((site)=>(
                            <SiteCard key={site.site_id} {...site}/>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home