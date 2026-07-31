import { renderToStaticMarkup } from "react-dom/server";
import { Render } from "@measured/puck";
import { config } from "../../assets/data/config.jsx";
import JSZip from "jszip";

export async function exportWebsite(data) {

    const body = renderToStaticMarkup(
        <Render
            config={config}
            data={data}
        />
    );


    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Website</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

${body}

<script src="script.js"></script>

</body>
</html>
`;


    const css = `
body {
    margin: 0;
    font-family: Arial, sans-serif;
}
`;


    const js = `
console.log("Website loaded");
`;


    const zip = new JSZip();

    zip.file("index.html", html)
    zip.file("styles.css", css)
    zip.file("script.js", js)

    const blob = await zip.generateAsync({
        type: "blob",
    })

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "website.zip";

    link.click();

    URL.revokeObjectURL(url);
}