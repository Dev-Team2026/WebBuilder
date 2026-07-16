import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div>
            <h1>Landing</h1>
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/editor">Build</Link>
            </nav>
        </div>
    )
}

export default Landing
