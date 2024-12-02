import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail } from "../../services/userService"

export const Login = () => {
  const [email, set] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "movie_shelf_user",
          JSON.stringify({
            userId: user.id,
          })
        )

        navigate("/home")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="container-login">
      <section>
        <form
          className="form-login text-center mb-4 bg-dark text-white p-3 rounded"
          onSubmit={handleLogin}
        >
          <h1>Welcome to The Movie Shelf</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group p-3">
              <button className="login-btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
        <section className="register-section bg-dark text-white p-3 rounded text-center">
          <p>Don't have an account?</p>
          <button
            className="register-btn btn-secondary"
            onClick={() => navigate("/register")}
          >
            Register Here
          </button>
        </section>
      </section>
    </main>
  )
}
