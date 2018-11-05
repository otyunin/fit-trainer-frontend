import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
// core components
import footerStyle from 'assets/jss/material-dashboard-react/components/footerStyle.jsx'

const Footer = ({ classes, routes }) => (
  <footer className={classes.footer}>
    <div className={classes.container}>
      <div className={classes.left}>
        <List className={classes.list}>
          {routes.map((route, key) => {
            if (route.invisible) return null
            return (
              <ListItem key={key} className={classes.inlineBlock}>
                <Link to={route.path}>
                  {route.sidebarName}
                </Link>
              </ListItem>
            )
          })}
        </List>
      </div>
      <p className={classes.right}>
        <span>
          &copy;
          {' '}
          {1900 + new Date().getYear()}
          {' '}
          <a href="https://github.com/otyunin" className={classes.a}>
            Oleg Tyunin
          </a>
          , made with love for a better web
        </span>
      </p>
    </div>
  </footer>
)

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
}

export default withStyles(footerStyle)(Footer)
