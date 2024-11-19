import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteMovie, getAllMovies } from "../../services/movieService"

export const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("movie_shelf_user"))
    const userId = loggedInUser?.userId

    if (userId) {
      getAllMovies(userId).then((movies) => {
        const foundMovie = movies.find((movie) => movie.id === parseInt(id))
        setMovie(foundMovie)
      })
    }
  }, [id])

  if (!movie) {
    return <div>Loading...</div>
  }

  const handleDeleteMovie = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("movie_shelf_user"))
    const userId = loggedInUser?.userId

    if (userId) {
      await deleteMovie(movie.id, userId)
      navigate(`/watchlists/${movie.watchlistId}`)
    }
  }
  const handleEditMovie = async () => {
    navigate(`/movie/${movie.id}/edit`)
  }
  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.imageURL} alt={movie.title} style={{ width: "200px" }} />
      <p>Rating: {movie.rating} stars</p>
      <p>Notes: {movie.notes || "No notes added"}</p>
      <div>
        <button onClick={handleDeleteMovie}>Delete</button>
        <button onClick={handleEditMovie}>Edit</button>
      </div>
    </div>
  )
}
