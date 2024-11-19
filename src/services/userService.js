export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching user by email:", error)
    })
}

export const createUser = async (user) => {
  try {
    const response = await fetch("http://localhost:8088/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })

    const createdUser = await response.json()

    const mappedUser = {
      ...createdUser,
      userId: createdUser.id,
    }

    return mappedUser
  } catch (error) {
    console.error("Error creating user:", error)
  }
}
