import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid/Grid'

import GridContainer from 'components/Grid/GridContainer.jsx'
import Button from 'components/CustomButtons/Button'
import Calendar from 'components/Calendar'
import { getWorkoutDates } from 'redux/actions/workout.action'
import { connect } from 'react-redux'

class Dashboard extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getWorkoutDates())
  }

  render() {
    const { dates } = this.props
    return (
      <div>
        <GridContainer style={{ maxWidth: 400 }}>
          <Grid container justify="space-between">
            <Button color="primary">Add new exercise</Button>
            <Button color="primary">Add new workout</Button>
          </Grid>
          <Calendar dates={dates} />
        </GridContainer>
      </div>
    )
  }
}

Dashboard.propTypes = {
  dates: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
}

Dashboard.defaultProps = {
  dates: [],
}

const mapStateToProps = store => ({
  dates: store.workout.dates,
})

export default connect(mapStateToProps)(Dashboard)
