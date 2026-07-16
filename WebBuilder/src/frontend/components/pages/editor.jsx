import { Puck } from "@measured/puck";
import { Link } from 'react-router-dom'
import { config } from "../../assets/data/config.jsx";

const initialData = {
    content: [],
};

export default function Editor() {
    return (
        <div>
            <Link to={"/build"}>Preview</Link>
        <Puck
            config={config}
            data={initialData}
            onPublish={(data) => {
                console.log(data);

                localStorage.setItem(
                    "page-data",
                    JSON.stringify(data)
                );
            }}
        />
        </div>
    );
}