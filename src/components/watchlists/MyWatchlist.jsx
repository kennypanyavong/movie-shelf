import "./MyWatchlist.css"
import { useEffect, useState } from "react"
import { getWatchlists } from "../../services/watchlistService"
import { Link } from "react-router-dom"
import mascotImage from "../../assets/Movie Shelf Cat.png"

export const MyWatchlists = ({ currentUser }) => {
  const [watchlists, setWatchlists] = useState([])

  useEffect(() => {
    getWatchlists().then((data) => setWatchlists(data))
  }, [])

  return (
    <div className="container mt-4 pt-5">
      <h2 className="text-center mb-4 bg-dark text-white p-3 rounded">
        My Watchlists
      </h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {watchlists.map((watchlist) => (
          <div
            className="card glowing-card bg-secondary text-white"
            style={{ width: "18rem" }}
            key={watchlist.id}
          >
            <Link
              to={`/watchlists/${watchlist.id}`}
              className="text-decoration-none text-white"
            >
              <img
                src={mascotImage}
                className="card-img-top"
                alt={watchlist.watchlistName}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{watchlist.watchlistName}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyWatchlists
