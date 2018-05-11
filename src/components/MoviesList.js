import React from 'react'
import Movie from './Movie'

const MoviesList = ({ isLoading, movies }) =>
  isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="movie-list">
      {movies.map(movie =>
        <Movie key={movie.id} {...movie}  />
      )}
    </div>
  )

export default MoviesList
