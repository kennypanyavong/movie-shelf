export const getWatchlists = () => {
  return fetch("http://localhost:8088/watchlists")
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching watchlists:", error)
    })
}
