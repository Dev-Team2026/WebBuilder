import { Render } from "@measured/puck";
import { config } from "../../assets/data/config.jsx";

export default function Build() {
    const data = JSON.parse(
        localStorage.getItem("page-data") || "{}"
    );

    return <Render config={config} data={data} />;
}