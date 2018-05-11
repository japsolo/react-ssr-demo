export const fetchMovies = () => dispatch => {
  dispatch({
    type: 'FETCH_MOVIES_REQUST'
  })
  return fetch('/movies.json')
    .then(res => res.json())
    .then(
      movies => dispatch({
        type: 'FETCH_MOVIES_SUCCESS',
        movies
      }),
      error => dispatch({
        type: 'FETCH_MOVIES_FAILURE',
        error
      })
    )
}
