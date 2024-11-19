export const getAllMovies = (userId) => {
  return fetch(`http://localhost:8088/series?userId=${userId}`)
    .then((res) => res.json())
    .catch((error) => console.error("Error fetching movies:", error))
}

export const addMovie = async (newMovie) => {
  try {
    const response = await fetch("http://localhost:8088/series", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
    return response.json()
  } catch (error) {
    console.error("Error adding movie:", error)
  }
}

export const updateMovie = async (updatedMovie) => {
  try {
    const response = await fetch(
      `http://localhost:8088/series/${updatedMovie.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMovie),
      }
    )
    return response.json()
  } catch (error) {
    console.error("Error updating movie", error)
  }
}

export const deleteMovie = async (seriesId, userId) => {
  try {
    // Fetch the series by ID
    const response = await fetch(`http://localhost:8088/series/${seriesId}`)
    const seriesToDelete = await response.json()

    // Check if the user is authorized to delete the movie
    if (seriesToDelete.userId !== userId) {
      console.error("You are unauthorized to delete this series.")
      return
    }

    const deleteResponse = await fetch(
      `http://localhost:8088/series/${seriesId}`,
      {
        method: "DELETE",
      }
    )

    if (deleteResponse.ok) {
      console.log(`Movie with ID ${seriesId} has been deleted.`)
    } else {
      console.error("Failed to delete the movie. Please try again.")
    }
  } catch (error) {
    console.error("Error deleting movie:", error)
  }
}
