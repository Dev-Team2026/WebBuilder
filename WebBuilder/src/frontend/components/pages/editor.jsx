import { Puck } from "@measured/puck";
import { Link } from 'react-router-dom'
import { config } from "../../assets/data/config.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function TitleChange() {
    useEffect(() => {
        document.title = 'Editor';
        document.body.style.overflow = "auto";
    }, []);
}

//send site data to backend to be saved in a file
const savePageData = async (data) =>{
   try {
      await axios.put("http://localhost:3000/save",data)
      .then((response)=>{
        console.log(response.data.message)
      })
    } catch(error) {
      console.log(error.message)
    }
}

export default function Editor() {
    TitleChange()
    const [loading, setLoading] = useState(true)
    const [initialData, setInitialData] = useState(null)

    //load inital data for puck editor
    useEffect(() => {
        async function loadPageData() {
            try {
                await axios.get("http://localhost:3000/load")
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