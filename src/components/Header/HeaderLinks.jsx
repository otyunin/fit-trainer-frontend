import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import MenuList from '@material-ui/core/MenuList'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Poppers from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import Hidden from '@material-ui/core/Hidden/Hidden'
// @material-ui/icons
import { AccountCircle, Person } from '@material-ui/icons'
// core components
import Button from 'components/CustomButtons/Button.jsx'

import headerLinksStyle from 'assets/jss/material-dashboard-react/components/headerLinksStyle.jsx'
import { logout } from '../../redux/actions/auth.action'

class HeaderLinks extends React.Component {
  state = {
    open: false,
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }
    this.setState({ open: false })
  }

  handleLogout = event => {
    const { dispatch } = this.props
    if (this.anchorEl.contains(event.target)) {
      return
    }
    dispatch(logout())
    this.setState({ open: false })
  }

  render() {
    const { classes, user } = this.props
    const { open } = this.state
    return (
      <div>
        {user && (
          <div className={classes.manager}>
            <Button
              buttonRef={node => {
                this.anchorEl = node
              }}
              color={window.innerWidth > 959 ? 'transparent' : 'white'}
              justIcon={!user}
              simple={!(window.innerWidth > 959)}
              aria-owns={open ? 'menu-list-grow' : null}
              aria-haspopup="true"
              onClick={this.handleToggle}
              className={classes.buttonLink}
            >
              {!user ? (
                <Person className={classes.icons} />
              ) : (
                <React.Fragment>
                  <Hidden smDown implementation="css">
                    <span className={classes.emailLabel}>{user.email}</span>
                    <AccountCircle className={classes.icons} />
                  </Hidden>
                  <Hidden mdUp implementation="css">
                    <AccountCircle className={classes.icons} />
                    <span className={classes.emailLabel}>{user.email}</span>
                  </Hidden>
                </React.Fragment>
              )}
            </Button>
            <Poppers
              open={open}
              anchorEl={this.anchorEl}
              transition
              disablePortal
              className={`${classNames({ [classes.popperClose]: !open })} ${classes.pooperNav}`}
              placement="bottom-end"
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      {!user ? (
                        <MenuList role="menu">
                          <Link to="/signin">
                            <MenuItem
                              onClick={this.handleClose}
                              className={classes.dropdownItem}
                            >
                              Sign in
                            </MenuItem>
                          </Link>
                          <Link to="/signup">
                            <MenuItem
                              onClick={this.handleClose}
                              className={classes.dropdownItem}
                            >
                              Sign up
                            </MenuItem>
                          </Link>
                        </MenuList>
                      ) : (
                        <MenuList role="menu">
                          <MenuItem
                            onClick={this.handleLogout}
                            className={classes.dropdownItem}
                          >
                            Sign out
                          </MenuItem>
                        </MenuList>
                      )}
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Poppers>
          </div>
        )}
      </div>
    )
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
}

HeaderLinks.defaultProps = {
  user: null,
}

const mapStateToProps = store => ({
  user: store.auth.user,
})

export default connect(mapStateToProps)(withStyles(headerLinksStyle)(HeaderLinks))
