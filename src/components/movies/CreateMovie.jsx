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
    <div>
      <h2>What Are you Watching?</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="imageURL">Add a Picture?</label>
          <input
            type="text"
            id="imageURL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
            required
          />
        </div>

        <div>
          <label htmlFor="notes">Notes/Review</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="watchlist">Add to which Watchlist?</label>
          <select
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

        <button type="submit">Add Movie</button>
      </form>
    </div>
  )
}
