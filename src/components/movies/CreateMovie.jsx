import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getWatchlists } from "../../services/watchlistService"
import { addMovie } from "../../services/movieService"

export const CreateMovie = () => {
  const [title, setTitle] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [rating, setRating] = useState(1)
  const [notes, setNotes] = useState("")
  const [selectedWatchlist, setSelectedWatchlist] = useState("")
  const [watchlists, setWatchlists] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getWatchlists().then((data) => setWatchlists(data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const loggedInUser = JSON.parse(localStorage.getItem("movie_shelf_user"))

    const newMovie = {
      title,
      imageURL,
      rating,
      notes,
      watchlistId: Number(selectedWatchlist),
      userId: loggedInUser.userId,
    }

    console.log(newMovie)
    console.log("Logged in user:", loggedInUser)
    console.log("User ID being sent:", loggedInUser.userId)

    addMovie(newMovie).then(() => {
      setTitle("")
      setImageURL("")
      setRating(1)
      setNotes("")
      setSelectedWatchlist("")
      navigate("/watchlists")
    })
  }

  return (
    <div className="container mt-4 pt-5">
      <h2 className="text-center mb-4 bg-dark text-white p-3 rounded">
        What Are You Watching?
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imageURL" className="form-label text-white">
            Add a Picture?
          </label>
          <input
            type="text"
            className="form-control"
            id="imageURL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
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
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label text-white">
            Notes/Review
          </label>
          <textarea
            className="form-control"
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="watchlist" className="form-label text-white">
            Add to Which Watchlist?
          </label>
          <select
            className="form-select"
            id="watchlist"
            value={selectedWatchlist}
            onChange={(e) => setSelectedWatchlist(e.target.value)}
            required
          >
            <option value="">Select a Watchlist</option>
            {watchlists.map((watchlist) => (
              <option key={watchlist.id} value={watchlist.id}>
                {watchlist.watchlistName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 d-flex justify-content-center">
          <button type="submit" className="btn btn-success">
            Add Movie
          </button>
        </div>
      </form>
    </div>
  )
}
