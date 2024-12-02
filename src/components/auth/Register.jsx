import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/userService"

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    email: "",
    username: "",
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    createUser(customer).then((createdUser) => {
      if (createdUser.hasOwnProperty("userid")) {
        localStorage.setItem(
          "movie_shelf_user",
          JSON.stringify({
            userid: createdUser.userid,
          })
        )
        console.log("Navigating...")
        window.alert("Account created successfully! Please log in.")
        navigate("/login")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(customer.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
        navigate("/login")
      }
    })
  }

  const updateCustomer = (evt) => {
    const copy = { ...customer }
    copy[evt.target.id] = evt.target.value
    setCustomer(copy)
  }

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h2 className="text-center mb-4 bg-dark text-white p-3 rounded">
          Please Register
        </h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Sign Up!
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
