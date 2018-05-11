import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { fetchMovies } from '../actions/movies'
import MoviesList from '../components/MoviesList'

const mapStateToProps = state => {
  return {
    movies: state.movies.items,
    isLoading: state.movies.isLoading
  }
}

export default compose(
  connect(mapStateToProps, { fetchMovies }),
  lifecycle({
    componentDidMount () {
      this.props.fetchMovies()
    }
  })
)(MoviesList)
