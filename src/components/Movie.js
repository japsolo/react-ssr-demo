import React from 'react'

const Movie = ({ title, poster_url, url, summary }) =>
  <div className="movie">
    <img src={poster_url} />
    <a href={url} target="_blank">
      {title}
    </a>
    <p>
      {summary}
    </p>
  </div>

export default Movie
