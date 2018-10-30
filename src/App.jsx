import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'

import indexRoutes from 'routes/index.jsx'
import { Route, Switch } from 'react-router-dom'

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      {indexRoutes.map((prop, key) => <Route path={prop.path} component={prop.component} key={key} />)}
    </Switch>
  </ConnectedRouter>
)

App.propTypes = {
  history: PropTypes.object,
}

App.defaultProps = {
  history: [],
}

export default App
