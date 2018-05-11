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
