import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
// @material-ui/icons
import Menu from '@material-ui/icons/Menu'
// core components
import Button from 'components/CustomButtons/Button.jsx'

import headerStyle from 'assets/jss/material-dashboard-react/components/headerStyle.jsx'
import HeaderLinks from './HeaderLinks.jsx'

function Header({ ...props }) {
  function makeBrand() {
    const { location, routes } = props
    let name
    routes.map((prop) => {
      if (prop.invisible) return null
      if (prop.path === location.pathname) {
        name = prop.navbarName
      }
      if (prop.path.match('/edit-workout') || prop.path.match('/create-workout')) {
        name = prop.navbarName
      }
      return null
    })
    return name
  }

  const { classes, color, handleDrawerToggle } = props
  const appBarClasses = classNames({
    [` ${classes[color]}`]: color,
  })
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger', 'inherit']),
  handleDrawerToggle: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
}

Header.defaultProps = {
  color: 'inherit',
}

export default withStyles(headerStyle)(Header)
