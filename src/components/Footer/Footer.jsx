import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
// core components
import footerStyle from 'assets/jss/material-dashboard-react/components/footerStyle.jsx'
import moment from 'moment'

const Footer = ({ classes, routes }) => (
  <footer className={classes.footer}>
    <div className={classes.container}>
      <div className={classes.left}>
        <List className={classes.list}>
          {routes.map((route, key) => {
            if (route.invisible) return null
            let workoutPath = null

            if (route.path.match('/create-workout')) workoutPath = `/create-workout/${moment().format('MM-DD-YYYY')}`
            if (route.path.match('/edit-workout')) workoutPath = `/edit-workout/${moment().format('MM-DD-YYYY')}`
            return (
              <ListItem key={key} className={classes.inlineBlock}>
                <Link to={workoutPath || route.path}>
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
