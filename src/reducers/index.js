import { combineReducers } from 'redux'

const moviesInitialState = {
  items: [],
  isLoading: false,
  error: null
}

const moviesReducer = (state = moviesInitialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_REQUST':
      return {
        ...state,
        isLoading: true
      }
    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state,
        items: action.movies,
        isLoading: false
      }
    case 'FETCH_MOVIES_FAILURE':
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default combineReducers({
  movies: moviesReducer
})
