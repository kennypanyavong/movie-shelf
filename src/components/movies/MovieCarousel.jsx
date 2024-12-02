import React from "react"
// import "./MovieCarousel.css"

export const MovieCarousel = ({ movies }) => (
  <div
    id="movieCarousel"
    className="carousel slide mx-auto"
    style={{ maxWidth: "800px" }}
    data-bs-ride="carousel"
  >
    <div className="carousel-inner">
      {movies.map((movie, index) => (
        <div
          className={`carousel-item ${index === 0 ? "active" : ""}`}
          key={movie.id}
        >
          <img
            src={movie.imageURL}
            className="d-block w-100"
            alt={movie.title}
            style={{ height: "500px", objectFit: "contain" }}
          />
          <div className="bg-secondary rounded text-center text-white p-3 mt-3">
            <h5>{movie.title}</h5>
            <p>{movie.notes || "No notes added"}</p>
            <a href={`/movie/${movie.id}`} className="btn btn-primary">
              View Details
            </a>
          </div>
        </div>
      ))}
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#movieCarousel"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#movieCarousel"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
)
