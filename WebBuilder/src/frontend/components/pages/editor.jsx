import { Puck } from "@measured/puck";
import { Link, useParams } from 'react-router-dom'
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
const savePageData = async (id, data) => {
    try {
        const response = await axios.put(
            `http://localhost:3000/websites/${id}`,
            {
                website_data: JSON.stringify(data)
            }
        );

        console.log(response.data.message);

    } catch(error) {
        console.log(error.message);
    }
};

export default function Editor() {
    TitleChange()
    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [initialData, setInitialData] = useState(null)

    //load initial data for puck editor
    useEffect(() => {
        async function loadPageData() {
            try {
                const response = await axios.get(`http://localhost:3000/websites/data/${id}`)
                const data =
                    typeof response.data.website_data === "string"
                        ? JSON.parse(response.data.website_data)
                        : response.data.website_data;

                setInitialData({
                    root: data.root ?? {},
                    content: data.content ?? []
                });
                setLoading(false)
            } 
            catch(error) {
                console.log(error.message)
            }
        }
        loadPageData()

    }, [id])

    //wait for loading to finish before mounting puck
    if(loading) return (<div>Loading</div>)
    console.log("Puck data:", initialData);
    console.log("Website ID:", id);
    return (
        <div>
            <Link to={`/build`}>Preview</Link>
        <Puck
            config={config}
            data={initialData}
            onPublish={(data) => {
                savePageData(id, data)
            }}
        />
        </div>
    )
}