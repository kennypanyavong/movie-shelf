import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom"

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("movie_shelf_user")
    navigate("/login", { replace: true })
  }

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/home">Home</Link>
      </li>
      <li className="navbar-item">
        <Link to="/watchlists">My Watchlists</Link>
      </li>
      <li className="navbar-item">
        <Link to="/add-movie">Add Movie</Link>
      </li>
      <li className="navbar-item">
        <Link to="/my-profile">My Profile</Link>
      </li>
      <li className="navbar-item">
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  )
}
