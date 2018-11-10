/* eslint-disable react/no-string-refs */
import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import Header from 'components/Header/Header.jsx'
import Footer from 'components/Footer/Footer.jsx'
import Sidebar from 'components/Sidebar/Sidebar.jsx'

import dashboardRoutes from 'routes/dashboard.jsx'

import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx'

import image from 'assets/img/sidebar-5.jpg'
import logo from 'assets/img/favicon.png'
import { SIGN_IN_FULFILLED } from 'redux/actions'
import { getUser } from 'utils/storage'

const switchRoutes = user => (
  <Switch>
    {dashboardRoutes(user).map((prop, key) => {
      if (prop.redirect) return <Redirect exact={prop.exact} from={prop.path} to={prop.to} key={key} />
      return <Route path={prop.path} component={prop.component} key={key} />
    })}
  </Switch>
)

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
    }
    this.resizeFunction = this.resizeFunction.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    if (localStorage.getItem('JWT_TOKEN') && localStorage.getItem('EMAIL')) {
      dispatch({
        type: SIGN_IN_FULFILLED,
        payload: getUser(),
      })
    }
    if (navigator.platform.indexOf('Win') > -1) {
      // eslint-disable-next-line no-new
      new PerfectScrollbar(this.refs.mainPanel)
    }
    window.addEventListener('resize', this.resizeFunction)
  }

  componentDidUpdate(e) {
    const { mobileOpen } = this.state
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0
      if (mobileOpen) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ mobileOpen: false })
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction)
  }

  handleDrawerToggle = () => {
    const { mobileOpen } = this.state
    this.setState({ mobileOpen: !mobileOpen })
  }

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false })
    }
  }

  render() {
    const { classes, user, ...rest } = this.props
    const { mobileOpen } = this.state
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes(user)}
          logoText="Fit trainer"
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes(user)}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes(user)}</div>
          </div>
          <Footer routes={dashboardRoutes(user)} />
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
}

Dashboard.defaultProps = {
  user: null,
}

const mapStateToProps = store => ({
  user: store.auth.user,
})

export default connect(mapStateToProps)(withStyles(dashboardStyle)(Dashboard))
