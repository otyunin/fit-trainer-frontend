import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import auth from './redux/reducers/auth.reducer'
import exercises from './redux/reducers/exercises.reducer'
import App from './App'

import 'assets/css/material-dashboard-react.css?v=1.5.0'

const history = createBrowserHistory()

const rootReducer = combineReducers({
  auth,
  exercises,
})

const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      promiseMiddleware(),
    ),
  ),
)

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render()

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render()
  })

  // Reload reducers
  module.hot.accept('./redux/reducers/auth.reducer', () => {
    store.replaceReducer(connectRouter(history)(auth))
  })
}

export default store
