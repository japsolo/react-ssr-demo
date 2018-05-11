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
