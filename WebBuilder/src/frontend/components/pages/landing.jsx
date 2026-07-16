import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div>
            <div>
                <h1>Landing</h1>
                <nav>
                <Link to="/home">Home</Link>
                <Link to="/editor">Build</Link>
                </nav>
            </div>
            <div>
                <h2>BrightPath Web Builder</h2>
            </div>
            <div>
                <p>Web Builder allows you to create websites by simpily draging and droping.</p>
            </div>
            <div>
                <p>Features</p>
            </div>
            <div>
                <ul>
                    <li>Personal account</li>
                    <li>Ability to save projects and have multiple on the go</li>
                    <li>Hosting options</li>
                </ul>
            </div>
        </div>
    )
}

export default Landing
