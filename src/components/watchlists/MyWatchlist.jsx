import { useEffect, useState } from "react"
import { getWatchlists } from "../../services/watchlistService"
import { Link } from "react-router-dom"

export const MyWatchlists = ({ currentUser }) => {
  const [watchlists, setWatchlists] = useState([])

  useEffect(() => {
    getWatchlists().then((data) => setWatchlists(data))
  }, [])

  return (
    <div>
      <h2>My Watchlists</h2>
      <div>
        {watchlists.map((watchlist) => (
          <Link to={`/watchlists/${watchlist.id}`} key={watchlist.id}>
            <h3>{watchlist.watchlistName}</h3>
            <div>
              <img
                src={watchlist.imageURL || "https://i.imgur.com/C6IEsZH.png"}
                alt={watchlist.watchlistName}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MyWatchlists
