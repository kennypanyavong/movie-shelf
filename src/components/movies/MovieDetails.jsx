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
    <div className="container mt-4">
      <div className="card mx-auto bg-dark" style={{ width: "24rem" }}>
        <img
          src={movie.imageURL}
          className="card-img-top"
          alt={movie.title}
          style={{ height: "500px", objectFit: "contain" }}
        />
        <div className="card-body text-white">
          <h5 className="card-title text-center">{movie.title}</h5>
          <p className="card-text text-white">
            <strong>Rating:</strong> ⭐ {movie.rating}
          </p>
          <p className="card-text text-white">
            <strong>Notes:</strong> {movie.notes || "No notes added"}
          </p>
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger" onClick={handleDeleteMovie}>
              Delete
            </button>
            <button className="btn btn-primary" onClick={handleEditMovie}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
