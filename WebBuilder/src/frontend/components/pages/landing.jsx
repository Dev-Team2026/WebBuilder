import { Link, useNavigate } from 'react-router-dom'
import {useEffect} from "react";

function TitleChange() {
    useEffect(() => {
        document.title = 'Welcome!';
    }, []);
}

const Landing = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/signup")
    }
    TitleChange();
    return (
        <div>
            <div className="LandingHead">
                <h1>Landing</h1>
                <nav className="LandingLink">
                <Link className="navLink" to="/signUp">Sign Up</Link>
                    <Link className="navLink" to="/login">Login</Link>
                </nav>
            </div>
            <div className="landingCenter">
                <h2>BrightPath Web Builder</h2>
                <p>Web Builder allows you to create websites by simply dragging and dropping.</p>
                <p>Features</p>
                <ul>
                    <li>Personal account</li>
                    <li>Ability to save projects and have multiple on the go</li>
                    <li>Hosting options</li>
                </ul>
                <button className="landingBtn" onClick={handleClick}>Get Started!</button>
            </div>
        </div>
    )
}

export default Landing
