import './index.css'
import { Link } from 'react-router-dom'
const NavBar = () => {
    return (
        <nav className="navbar">
            <a href="/" className="logo">Movie Discover</a>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/films">Movies</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;