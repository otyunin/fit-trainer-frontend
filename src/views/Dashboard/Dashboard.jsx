import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'

import Grid from '@material-ui/core/Grid/Grid'
import { FiberManualRecord } from '@material-ui/icons'
import Button from 'components/CustomButtons/Button'
import Calendar from 'components/Calendar'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'

import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle'

import { connect } from 'react-redux'
import { getWorkoutDates } from 'redux/actions/workout.action'
import moment from 'moment'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
  state = {
    selected: null,
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getWorkoutDates())
  }

  handleSelectDate = date => {
    this.setState({ selected: moment(date).format('YYYY-MM-DD') })
  }

  handleAddWorkout = () => {
    const { dispatch } = this.props
    const { selected } = this.state
    if (selected) {
      dispatch(push(`/create-workout/${selected}`))
    }
  }

  render() {
    const { dates, classes } = this.props
    return (
      <div>
        <GridContainer style={{ maxWidth: 400 }}>
          <Grid container justify="space-between">
            <Button component={Link} to="/create-exercise" color="primary">Add new exercise</Button>
            <Button color="primary" onClick={this.handleAddWorkout}>Add new workout</Button>
          </Grid>
          <Card className={classes.legend}>
            <CardBody>
              <GridContainer>
                <Grid container alignItems="center">
                  <FiberManualRecord style={{ color: '#6cf47d' }} className={classes.legendIcon} />
                  click to edit the created workout
                </Grid>
                <Grid container alignItems="center">
                  <FiberManualRecord style={{ color: '#559fff' }} className={classes.legendIcon} />
                  <span>select a date and click &#34;Add new workout&#34;</span>
                </Grid>
              </GridContainer>
            </CardBody>
          </Card>
          <Calendar dates={dates} onSelectDate={this.handleSelectDate.bind(this)} />
        </GridContainer>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  dates: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
}

Dashboard.defaultProps = {
  dates: [],
}

const mapStateToProps = store => ({
  dates: store.workout.dates,
})

export default connect(mapStateToProps)(withStyles(dashboardStyle)(Dashboard))
