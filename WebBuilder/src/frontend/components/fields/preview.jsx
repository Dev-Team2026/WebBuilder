import { Render } from "@measured/puck";
import config from "../puck.config";
import data from "../data/page.json";

export default function Preview() {
    return (
        <Render
            config={config}
            data={data}
        />
    );
}