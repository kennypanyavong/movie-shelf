import { useEffect, useState } from "react"
import { getWatchlists } from "../../services/watchlistService"
import { getAllMovies } from "../../services/movieService"
import { Link, useParams } from "react-router-dom"

export const ViewWatchlist = () => {
  const { id } = useParams() // id from useParams
  const [watchlist, setWatchlist] = useState(null)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    // Fetch all watchlists and find the one matching the ID
    getWatchlists().then(
      (data) => {
        const matchingWatchlist = data.find((w) => w.id === parseInt(id))
        setWatchlist(matchingWatchlist)
      },
      [id]
    )
  }, [id])

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("movie_shelf_user"))

    // Fetch all movies
    getAllMovies(loggedInUser.userId).then(setMovies)
  }, [])

  // If the watchlist is not loaded yet, show a loading message
  if (!watchlist) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{watchlist.watchlistName}</h1>
      <ul>
        {movies
          .filter((movie) => movie.watchlistId === watchlist.id) // Only movies in this watchlist
          .map((movie) => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.imageURL}
                  alt={movie.title}
                  style={{ width: "200px" }}
                />
                <h3>{movie.title}</h3>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
