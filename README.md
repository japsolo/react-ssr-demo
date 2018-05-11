# react-ssr-demo

## Crear un proyecto React

Crear una carpeta para el proyecto

```
mkdir react-ssr-demo && cd $_
```

Crear el `package.json` inicial

```
npm init -y
```

Instalar React

```
npm install react react-dom --save
```

Instalar Babel

```
npm install babel-core babel-preset-env babel-preset-react babel-preset-stage-2 --save-dev
```

Instalar Webpack

```
npm install webpack webpack-cli babel-loader html-webpack-plugin --save-dev
```

Instalar DevServer

```
npm install webpack-dev-server --save-dev
```

Configurar Babel

```
cat << __EOF__ > .babelrc
{
  "presets": ["env", "react", "stage-2"]
}
__EOF__
```

Configurar Webpack

```
cat << __EOF__ > webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
  mode: 'development',
  entry: {
    client: './src/client'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [
      { test: /js$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true
  }
}

module.exports = config
__EOF__
```

Crear un directorio para los archivos estáticos

```
mkdir public
```

Crear el archivo `index.html`

```
cat << __EOF__ > public/index.html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
__EOF__
```

Crear el directorio para componentes de React

```
mkdir -p src/components
```

Crear el primer componente React

```
cat << __EOF__ > src/components/App.js
import React from 'react'

const App = () =>
  <div>
    <h1>¡Funciona!</h1>
  </div>

export default App
__EOF__
```

Crear el punto de entrada a la aplicación

```
cat << __EOF__ > src/client.js
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

render(
  <App />,
  document.getElementById('root')
)
__EOF__
```

Probar

```
./node_modules/.bin/webpack-dev-server --open
```

Para comodidad, cambiar los scripts del `package.json`

```json
  "scripts": {
    "start": "webpack-dev-server --open",
    "build": "webpack-cli -P",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## Agregar React Router

Instalar React Router

```
npm install react-router-dom --save
```

Crear directorio para las páginas

```
mkdir -p src/pages
```

Crear la página de inicio

```
cat << __EOF__ > src/pages/HomePage.js
import React from 'react'

const HomePage = () =>
  <div>
    <h1>Home</h1>
  </div>

export default HomePage
__EOF__
```

Crear la página de listado de películas

```
cat << __EOF__ > src/pages/MoviesPage.js
import React from 'react'

const MoviesPage = () =>
  <div>
    <h1>Movies</h1>
  </div>

export default MoviesPage
__EOF__
```

Crear la página de 404

```
cat << __EOF__ > src/pages/NotFoundPage.js
import React from 'react'

const NotFoundPage = () =>
  <div>
    <h1>404 Not Found</h1>
  </div>

export default NotFoundPage
__EOF__
```

Actualizar el componente principal para definir las rutas principales de la aplicación

```
cat << __EOF__ > src/components/App.js
import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MoviesPage from '../pages/MoviesPage'
import NotFoundPage from '../pages/NotFoundPage'

const App = () =>
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/movies">Movies</Link></li>
      <li><Link to="/inexistente">Inexistente</Link></li>
    </ul>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/movies" component={MoviesPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>

export default App
__EOF__
```

Actualizar el punto de entrada para contener la aplicación dentro de `BrowserRouter`

```
cat << __EOF__ > src/client.js
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
__EOF__
```

Probar

```
npm start
```

## Agregar Redux

Instalar Redux

```
npm install redux react-redux redux-thunk recompose --save
```

Crear directorios para Redux

```
mkdir -p src/{actions,containers,reducers}
```

Crear las `actions`

```
cat << __EOF__ > src/actions/movies.js
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
__EOF__
```

Crear los `reducers`

```
cat << __EOF__ > src/reducers/index.js
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
__EOF__
```

Actualizar el punto de entrada para crear el store y proveer la aplicación del store

```
cat << __EOF__ > src/client.js
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import App from './components/App'

const store = configureStore()

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
__EOF__
```

Crear el constructor del `store`

```
cat << __EOF__ > src/store.js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

export const configureStore = preloadedState => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk))
}
__EOF__
```

Actualizar la página de películas para incluir el container

```
cat << __EOF__ > src/pages/MoviesPage.js
import React from 'react'
import MoviesList from '../containers/MoviesList'

const MoviesPage = () =>
  <div>
    <h1>Movies</h1>
    <MoviesList />
  </div>

export default MoviesPage
__EOF__
```

Crear el container de películas

```
cat << __EOF__ > src/containers/MoviesList.js
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
__EOF__
```

Crear el componentes para mostrar las películas

```
cat << __EOF__ > src/components/MoviesList.js
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
__EOF__
```

Crear el componente que muestra una película

```
cat << __EOF__ > src/components/Movie.js
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
__EOF__
```

Instalar el plugin de Webpack para copiar archivos estáticos al `build`

```
npm i --save-dev copy-webpack-plugin
```

Configurar el plugin `copy`

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')

...

  plugins: [
    new CopyWebpackPlugin([
      { from: 'public' }
    ]),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
```

Crear un archivo con datos de peliculas

```
cat << __EOF__ > public/movies.json
[
  {
    "id": "tt2380307",
    "title": "Coco",
    "year": 2017,
    "summary": "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    "url": "https://www.imdb.com/title/tt2380307",
    "poster_url": "https://ia.media-imdb.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_UY268_CR3,0,182,268_AL_.jpg",
    "rating": 8.5
  },
  {
    "id": "tt0910970",
    "title": "WALL·E",
    "year": 2008,
    "summary": "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
    "url": "https://www.imdb.com/title/tt0910970",
    "poster_url": "https://ia.media-imdb.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 8.4
  },
  {
    "id": "tt0114709",
    "title": "Toy Story",
    "year": 1995,
    "summary": "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    "url": "https://www.imdb.com/title/tt0114709",
    "poster_url": "https://ia.media-imdb.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 8.3
  },
  {
    "id": "tt1049413",
    "title": "Up",
    "year": 2009,
    "summary": "Seventy-eight year old Carl Fredricksen travels to Paradise Falls in his home equipped with balloons, inadvertently taking a young stowaway.",
    "url": "https://www.imdb.com/title/tt1049413",
    "poster_url": "https://ia.media-imdb.com/images/M/MV5BMTk3NDE2NzI4NF5BMl5BanBnXkFtZTgwNzE1MzEyMTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 8.3
  },
  {
    "id": "tt0266543",
    "title": "Finding Nemo",
    "year": 2003,
    "summary": "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.",
    "url": "https://www.imdb.com/title/tt0266543",
    "poster_url": "https://ia.media-imdb.com/images/M/MV5BZjMxYzBiNjUtZDliNC00MDAyLTg3N2QtOWNjNmNhZGQzNDg5XkEyXkFqcGdeQXVyNjE2MjQwNjc@._V1_UY268_CR1,0,182,268_AL_.jpg",
    "rating": 8.1
  },
  {
    "id": "tt0198781",
    "title": "Monsters, Inc.",
    "year": 2001,
    "summary": "In order to power the city, monsters have to scare children so that they scream. However, the children are toxic to the monsters, and after a child gets through, 2 monsters realize things may not be what they think.",
    "url": "https://www.imdb.com/title/tt0198781",
    "poster_url": "https://ia.media-imdb.com/images/M/MV5BMTY1NTI0ODUyOF5BMl5BanBnXkFtZTgwNTEyNjQ0MDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 8.1
  },
  {
    "id": "tt0317705",
    "title": "The Incredibles",
    "year": 2004,
    "summary": "A family of undercover superheroes, while trying to live the quiet suburban life, are forced into action to save the world.",
    "url": "https://www.imdb.com/title/tt0317705",
    "poster_url": "https://ia.media-imdb.com/images/M/MV5BMTY5OTU0OTc2NV5BMl5BanBnXkFtZTcwMzU4MDcyMQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 8
  },
  {
    "id": "tt0382932",
    "title": "Ratatouille",
    "year": 2007,
    "summary": "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous restaurant.",
    "url": "https://www.imdb.com/title/tt0382932",
    "poster_url": "https://ia.media-imdb.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 8
  }
]
__EOF__
```

Probar

```
npm start
```
