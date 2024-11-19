import { useEffect, useState } from "react"
import { getAllMovies, updateMovie } from "../../services/movieService"
import { useNavigate, useParams } from "react-router-dom"

export const EditMovie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

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
            console.log("Found movie:", foundMovie)
          } else {
            setError("Movie not found.")
          }
        })
        .catch((error) => {
          console.error("error fetching movies:", error)
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

    const updatedMovie = { ...movie, userId }
    try {
      await updateMovie(updatedMovie)
      console.log("Updated movie to be sent:", updatedMovie)
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
    <div>
      <h2>What do you want to change?</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="imageURL">Image URL</label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={movie.imageURL}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={movie.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
          />
        </div>

        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={movie.notes || ""}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Update Movie</button>
      </form>
    </div>
  )
}
