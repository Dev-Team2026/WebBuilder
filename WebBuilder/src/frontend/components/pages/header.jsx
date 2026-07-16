import { Link } from 'react-router-dom'

const Heading = () => {
    return (
        <header>
            <h1><Link className="landLink" to="/">WebMaker App but in a header</Link></h1>

            <nav className="headerNav">
                <Link className="navLink" to="/home">Home</Link>
                <Link className="navLink" to="/editor">Build</Link>
            </nav>
        </header>
    )
}

export default Heading