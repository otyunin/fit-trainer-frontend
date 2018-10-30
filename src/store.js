import { createBrowserHistory } from 'history'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

const history = createBrowserHistory()

const reducers = combineReducers({})

const store = createStore(
  connectRouter(history)(reducers),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      promiseMiddleware(),
    ),
  ),
)

export default store
