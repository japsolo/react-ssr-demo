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
