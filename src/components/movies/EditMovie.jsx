import { useEffect, useState } from "react"
import { getAllMovies, updateMovie } from "../../services/movieService"
import { useNavigate, useParams } from "react-router-dom"
import { getWatchlists } from "../../services/watchlistService"

export const EditMovie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState(null)
  const [selectedWatchlist, setSelectedWatchlist] = useState("")
  const [watchlists, setWatchlists] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getWatchlists().then((data) => {
      setWatchlists(data)
    })
  }, [])

  // Fetch the movie data
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("movie_shelf_user"))
    const userId = loggedInUser?.userId

    if (userId) {
      getAllMovies(userId)
        .then((movies) => {
          const foundMovie = movies.find((m) => m.id === parseInt(id))
          if (foundMovie) {
            if (!foundMovie.watchlistId) {
              setError("The movie's watchlistId is missing.")
              return
            }
            setMovie(foundMovie)
            setSelectedWatchlist(foundMovie.watchlistId)
          } else {
            setError("Movie not found.")
          }
        })
        .catch((error) => {
          setError("Failed to fetch movie data.")
        })
    }
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: name === "rating" ? Number(value) : value, // Convert rating to number
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const loggedInUser = JSON.parse(localStorage.getItem("movie_shelf_user"))
    const userId = loggedInUser?.userId

    if (!movie.watchlistId) {
      setError("Invalid movie watchlist.")
      return
    }

    const updatedMovie = { ...movie, userId, watchlistId: selectedWatchlist }
    try {
      await updateMovie(updatedMovie)
      navigate(`/movie/${movie.id}`)
    } catch {
      setError("Failed to update movie.")
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!movie) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mt-4 pt-5">
      <h2 className="text-center mb-4 bg-dark text-white p-3 rounded">
        What do you want to change?
      </h2>
      <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="title" className="form-label text-white">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imageURL" className="form-label text-white">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="imageURL"
            name="imageURL"
            value={movie.imageURL}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rating" className="form-label text-white">
            Rating
          </label>
          <input
            type="number"
            className="form-control"
            id="rating"
            name="rating"
            value={movie.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label text-white">
            Notes
          </label>
          <textarea
            className="form-control"
            id="notes"
            name="notes"
            value={movie.notes || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="watchlist" className="form-label text-white">
            Change Watchlist?
          </label>
          <select
            className="form-select"
            id="watchlist"
            value={selectedWatchlist || ""} // Use the movie's watchlistId initially
            onChange={(e) => setSelectedWatchlist(parseInt(e.target.value))}
            required
          >
            <option value="">Select a Watchlist</option>
            {watchlists.length > 0 ? (
              watchlists.map((watchlist) => {
                return (
                  <option key={watchlist.id} value={watchlist.id}>
                    {watchlist.watchlistName}
                  </option>
                )
              })
            ) : (
              <option disabled>No watchlists available</option>
            )}
          </select>
        </div>
        <div className="mb-3 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Update Movie
          </button>
        </div>
      </form>
    </div>
  )
}
