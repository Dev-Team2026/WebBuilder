import { Puck } from "@measured/puck";
import { useNavigate } from 'react-router-dom'
import { config } from "../../assets/data/config.jsx";
import * as path from "node:path";
import {exportWebsite} from "../fields/exportWebsite.jsx";

const initialData = {
    content: [],
};

export default function Editor() {

    const navigate = useNavigate();

    return (
        <div>
        <Puck
            config={config}
            data={initialData}
            onPublish={(data) => {
                console.log(data);

                localStorage.setItem(
                    "page-data",
                    JSON.stringify(data)
                );
                navigate("/build")
                exportWebsite(data)
            }}
        />
        </div>
    );
}