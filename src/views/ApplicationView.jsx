import { Outlet, Route, Routes } from "react-router-dom"
import { ViewWatchlist } from "../components/watchlists/ViewWatchlist"
import { CreateMovie } from "../components/movies/CreateMovie"
import { Welcome } from "../components/welcome/Welcome"
import { UserProfile } from "../components/user/UserProfile"
import { NavBar } from "../components/navbar/Navbar"
import MyWatchlists from "../components/watchlists/MyWatchlist"
import { MovieDetails } from "../components/movies/MovieDetails"
import { EditMovie } from "../components/movies/EditMovie"
import { useEffect, useState } from "react"

export const ApplicationView = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localMovieUser = localStorage.getItem("movie_shelf_user")
    const movieUserObject = JSON.parse(localMovieUser)

    setCurrentUser(movieUserObject)
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="home" element={<Welcome />} />
        <Route
          path="watchlists"
          element={<MyWatchlists currentUser={currentUser} />}
        />
        <Route path="watchlists/:id" element={<ViewWatchlist />} />
        <Route path="movie/:id" element={<MovieDetails />} />
        <Route path="movie/:id/edit" element={<EditMovie />} />
        <Route path="add-movie" element={<CreateMovie />} />
        <Route path="my-profile" element={<UserProfile />} />
      </Route>
    </Routes>
  )
}
