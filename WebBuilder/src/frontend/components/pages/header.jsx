import { Link } from 'react-router-dom'

const Heading = () => {
    return (
        <header className="LandingHead">
            <h1>Website Builder</h1>
            <nav className="LandingLink">
                <Link to="/home">Home</Link>
                <Link to="/editor">Build</Link>
                <Link to="/login">Login</Link>
            </nav>
        </header>
    )
}

export default Heading