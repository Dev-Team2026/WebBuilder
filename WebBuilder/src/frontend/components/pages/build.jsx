import { Render } from "@measured/puck";
import { config } from "../../assets/data/config.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

//hard coded site ID for testing
const siteId = 1

export default function Build() {
    const [loading, setLoading] = useState(true)
    const [initialData, setInitialData] = useState(null)

    //load initial data for puck editor
    useEffect(() => {
        async function loadPageData() {
            try {
                await axios.get("http://localhost:3000/load",{
                    params: {
                        id: siteId
                    }
                })
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

    if(loading) return (<div>Loading</div>)
    return <Render config={config} data={initialData} />;
}