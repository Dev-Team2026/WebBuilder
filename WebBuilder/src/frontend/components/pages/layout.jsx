import { Outlet } from 'react-router-dom'
import Heading from "./header.jsx";

const Layout = () => {
    return (
        <div>
            <Heading />

            <Outlet />
        </div>
    )
}

export default Layout
