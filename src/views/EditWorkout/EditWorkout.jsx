import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid/Grid'
import FormLabel from '@material-ui/core/FormLabel/FormLabel'
// @material-ui/icons
import { ArrowDownward, ArrowUpward, Cancel } from '@material-ui/icons'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import Button from 'components/CustomButtons/Button'
import CardFooter from 'components/Card/CardFooter'
import Table from 'components/Table/Table'
import CustomSelect from 'components/CustomSelect/CustomSelect'
import CustomInput from 'components/CustomInput/CustomInput'

import createWorkoutStyle from 'assets/jss/material-dashboard-react/views/createWorkoutStyle'
import { connect } from 'react-redux'
import { getWorkout } from 'redux/actions/workout.action'
import { getExercises } from 'redux/actions/exercises.action'

class EditWorkout extends React.Component {
  state = {
    workout: null,
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getWorkout())
    dispatch(getExercises())
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { workout } = this.props
    if (nextProps.workout && workout !== nextProps.workout) {
      this.setState({ workout: nextProps.workout.workout })
    }
  }

  handleChange = (event) => {
    const { workout } = this.state
    workout[event.target.name] = event.target.value
    this.setState(workout)
  }

  render() {
    const { classes, exercises } = this.props
    const { workout } = this.state
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4 className={classes.cardTitleWhite}>Edit workout</h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <Button color="primary">Edit exercise</Button>
                </Grid>
                <Grid container alignItems="center">
                  <Table
                    tableData={!workout ? [] : workout.exercises.map(workoutExercise => [
                      <CustomSelect
                        labelText="Exercise name"
                        id="exercise"
                        value={workoutExercise.exercise.name}
                        selectData={!exercises ? [] : exercises.map(exercise => exercise.name)}
                        inputProps={{
                          name: 'exercise',
                          onChange: (event) => this.handleChange(event),
                        }}
                        labelProps={{ shrink: true }}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />,
                      <CustomInput
                        labelText="Repeats"
                        id="repeats"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'repeats',
                          onChange: (event) => this.handleChange(event),
                          value: workoutExercise.repeats,
                        }}
                      />,
                      <CustomInput
                        labelText="Measurement"
                        id="measurement"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'measurement',
                          onChange: (event) => this.handleChange(event),
                          value: workoutExercise.measurement,
                        }}
                      />,
                      <FormLabel>kg</FormLabel>,
                      <div>
                        <Button color="info">
                          <ArrowUpward />
                        </Button>
                        <Button color="info">
                          <ArrowDownward />
                        </Button>
                        <Button color="warning">
                          <Cancel />
                        </Button>
                      </div>,
                    ])}
                  />
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary">Update workout</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

EditWorkout.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  workout: PropTypes.object,
  exercises: PropTypes.array,
}

EditWorkout.defaultProps = {
  workout: null,
  exercises: [],
}

const mapStateToProps = store => ({
  workout: store.workout.workout,
  exercises: store.exercises.exercises,
})

export default connect(mapStateToProps)(withStyles(createWorkoutStyle)(EditWorkout))
