import { useEffect, useState } from "react"
import { getWatchlists } from "../../services/watchlistService"
import { getAllMovies } from "../../services/movieService"
import { Link, useParams } from "react-router-dom"
import { MovieCarousel } from "../movies/MovieCarousel"

export const ViewWatchlist = () => {
  const { id } = useParams()
  const [watchlist, setWatchlist] = useState(null)
  const [movies, setMovies] = useState([])

  useEffect(() => {
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

    getAllMovies(loggedInUser.userId).then(setMovies)
  }, [])

  if (!watchlist) {
    return <div>Loading...</div>
  }

  const filteredMovies = movies.filter(
    (movie) => movie.watchlistId === watchlist.id
  )

  return (
    <div className="container w-100 mw-75 mt-4 pt-5">
      <h1 className="text-center mb-4 bg-dark text-white p-3 rounded">
        {watchlist.watchlistName}
      </h1>
      {filteredMovies.length > 0 ? (
        <div className="d-flex justify-content-center align-items-center vh-75">
          <div className="w-100 mw-75">
            <MovieCarousel movies={filteredMovies} />
          </div>
        </div>
      ) : (
        <p className="text-center text-white">
          No movies in this watchlist yet.
        </p>
      )}
    </div>
  )
}
