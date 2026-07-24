import { Puck } from "@measured/puck";
import { Link } from 'react-router-dom'
import { config } from "../../assets/data/config.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

//hard coded site ID for testing
const siteId = 1

//send site data to backend to be saved in a file
const savePageData = async (data) =>{
   try {
        await axios.put("http://localhost:3000/save",data,{
            params: {
                        id: siteId
                    }
        })
        .then((response)=>{
            console.log(response.data.message)
        })
    } catch(error) {
        console.log(error.message)
    }
}

export default function Editor(props) {
    const [loading, setLoading] = useState(true)
    const [initialData, setInitialData] = useState(null)

    //const location = useLocation();
    //const siteId = location.state.siteId;

    //load inital data for puck editor
    useEffect(() => {
        async function loadPageData() {
            try {
                await axios.get("http://localhost:3000/load", {
                    params: {
                        id: siteId
                    }
                }
                )
                .then((response)=>{
                    setInitialData({content : response.data})
                    setLoading(false)
                })
            } 
            catch(error) {
                console.log(error.message)
            }
        }
        loadPageData()
    }, [])

    //wait for loading to finish before mounting puck
    if(loading) return (<div>Loading</div>)
    return (
        <div>
            <Link to={"/build"}>Preview</Link>
        <Puck
            config={config}
            data={initialData}
            onPublish={(data) => {
                //
                savePageData(data)
            }}
        />
        </div>
    )
}