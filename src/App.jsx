import "./App.css"
import { Route, Routes } from "react-router-dom"
import { ApplicationView } from "./views/ApplicationView"
import { Authorized } from "./views/Authorized"
import { Login } from "./components/auth/Login"

import { Register } from "./components/auth/Register"

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationView />
          </Authorized>
        }
      />
    </Routes>
  )
}

export default App
