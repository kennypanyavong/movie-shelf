import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
  let location = useLocation()

  if (localStorage.getItem("movie_shelf_user")) {
    return children
  } else {
    return <Navigate to={`/`} state={{ from: location }} replace />
  }
}
