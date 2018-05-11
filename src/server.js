import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import App from './components/App'

const app = express()
const port = process.env.PORT || 3000

app.use('/', express.static('build'))

app.use(handleRender)

function handleRender (req, res) {
  const store = configureStore()
  const context = {}

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const preloadedState = store.getState()

  res.send(renderFullPage(html, preloadedState))
}

function renderFullPage (html, preloadedState) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>React App</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/client-bundle.js"></script>
      </body>
    </html>
  `
}

const server = app.listen(port, err => {
  if (err) {
    return console.error(err)
  }
  console.log(`Listening at port ${server.address().port}`)
})

