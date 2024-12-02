import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom"

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("movie_shelf_user")
    navigate("/login", { replace: true })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          🎥 The Movie Shelf
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/home">
              Home
            </Link>
            <Link className="nav-link" to="/watchlists">
              My Watchlists
            </Link>
            <Link className="nav-link" to="/add-movie">
              Add Movie
            </Link>
            {/* <Link className="nav-link" to="/my-profile">
              My Profile
            </Link> */}
            <button
              className="btn btn-outline-light ms-lg-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
