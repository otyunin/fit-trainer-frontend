/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid/Grid'
import FormLabel from '@material-ui/core/FormLabel/FormLabel'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
// @material-ui/icons
import { ArrowDownward, ArrowUpward, Cancel, CheckCircleOutline, ErrorOutline, Today } from '@material-ui/icons'
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
import Snackbar from 'components/Snackbar/Snackbar'

import createWorkoutStyle from 'assets/jss/material-dashboard-react/views/createWorkoutStyle'
import { connect } from 'react-redux'
import { getExercises } from 'redux/actions/exercises.action'
import { getWorkout, updateWorkout } from 'redux/actions/workout.action'
import moment from 'moment'

class EditWorkout extends React.Component {
  state = {
    workout: {},
    workoutExercises: [],
    openDialog: false,
    openSnackbar: false,
    indexToRemove: null,
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    dispatch(getWorkout(match.params.date))
    dispatch(getExercises())
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { workout } = this.props
    if (nextProps.workout && workout !== nextProps.workout) {
      this.setState({ workout: nextProps.workout, workoutExercises: nextProps.workout.exercises })
    }
  }

  handleAddExercises = () => {
    const { workoutExercises } = this.state
    const body = { exercise: {}, repeats: '', measurement: '', order: workoutExercises.length }
    workoutExercises.push(body)
    this.setState({ workoutExercises })
  }

  handleChangeSelect = (event, target) => {
    const { exercises } = this.props
    const { workoutExercises } = this.state
    const foundExercise = exercises.filter(exercise => exercise._id === event.target.value)
    workoutExercises[target].exercise = foundExercise[0]
    this.setState({ workoutExercises })
  }

  handleChange = (event, target) => {
    const { workoutExercises } = this.state
    workoutExercises[target][event.target.name] = event.target.value
    this.setState({ workoutExercises })
  }

  handleClickUp = target => {
    const { workoutExercises } = this.state
    if (target !== 0) {
      const newWorkout = workoutExercises.map((workoutExercise, index) => {
        if (index === target - 1) {
          workoutExercise.order += 1
        }
        if (index === target) {
          workoutExercise.order -= 1
        }
        return workoutExercise
      })
      this.setState({ workoutExercises: newWorkout })
    } else {
      const newWorkout = workoutExercises.map((workoutExercise, index) => {
        if (index > target) {
          workoutExercise.order -= 1
        }
        if (index === target) {
          workoutExercise.order = workoutExercises.length - 1
        }
        return workoutExercise
      })
      this.setState({ workoutExercises: newWorkout })
    }
  }

  handleClickDown = target => {
    const { workoutExercises } = this.state
    if (target !== workoutExercises.length - 1) {
      const newWorkout = workoutExercises.map((workoutExercise, index) => {
        if (index === target + 1) {
          workoutExercise.order -= 1
        }
        if (index === target) {
          workoutExercise.order += 1
        }
        return workoutExercise
      })
      this.setState({ workoutExercises: newWorkout })
    } else {
      const newWorkout = workoutExercises.map((workoutExercise, index) => {
        if (index < target) {
          workoutExercise.order += 1
        }
        if (index === target) {
          workoutExercise.order = 0
        }
        return workoutExercise
      })
      this.setState({ workoutExercises: newWorkout })
    }
  }

  handleCloseDialog = () => {
    this.setState({ openDialog: false, indexToRemove: null })
  }

  handleCloseSnackbar = () => {
    this.setState({ openSnackbar: false })
  }

  handleClickRemove = target => {
    this.setState({ openDialog: true, indexToRemove: target })
  }

  handleApplyDeletion = () => {
    const { workoutExercises, indexToRemove } = this.state
    const newWorkout = workoutExercises.map((workoutExercise, index) => {
      if (index > indexToRemove) {
        workoutExercise.order -= 1
      }
      return workoutExercise
    })
    newWorkout.splice(indexToRemove, 1)
    this.setState({ workoutExercises: newWorkout, openDialog: false })
  }

  handleSubmit = () => {
    const { workoutExercises, workout } = this.state
    const { dispatch, match } = this.props
    const newExercises = workoutExercises.map(workoutExercise => ({
      ...workoutExercise, exercise: workoutExercise.exercise._id,
    }))
    workout.exercises = newExercises
    dispatch(updateWorkout(workout, match.params.date))
    this.setState({ openSnackbar: true })
    setTimeout(() => this.setState({ openSnackbar: false }), 6000)
  }

  render() {
    const { classes, exercises, error, match } = this.props
    const { workoutExercises, openDialog, openSnackbar } = this.state

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="primary" className={classes.cardHeader}>
                <GridContainer justify="space-between">
                  <GridItem>
                    <h4 className={classes.cardTitleWhite}>Edit workout</h4>
                  </GridItem>
                  <GridItem>
                    <Grid container alignItems="center">
                      <Today className={classes.dateIcon} />
                      {moment(match.params.date, 'DD-MM-YYYY').format('ddd, MMM Do YYYY')}
                    </Grid>
                  </GridItem>
                </GridContainer>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <Button color="primary" onClick={this.handleAddExercises}>Add exercise</Button>
                </Grid>
                <Grid container alignItems="center">
                  <Table
                    tableData={workoutExercises.sort((a, b) => a.order - b.order)
                      .map((workoutExercise, index) => [
                        <CustomSelect
                          labelText="Exercise name"
                          id="exercise"
                          key={index}
                          selectData={!exercises ? [] : exercises.map(exercise => exercise)}
                          value={workoutExercise.exercise._id}
                          showKey="name"
                          returnKey="_id"
                          inputProps={{
                            name: 'exercise',
                            onChange: (event) => this.handleChangeSelect(event, index),
                            renderValue: () => workoutExercise.exercise.name,
                          }}
                          labelProps={{ shrink: true }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />,
                        <CustomInput
                          labelText="Repeats"
                          id="repeats"
                          key={index}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'repeats',
                            type: 'number',
                            value: workoutExercise.repeats,
                            onChange: (event) => this.handleChange(event, index),
                          }}
                        />,
                        <CustomInput
                          labelText="Measurement"
                          id="measurement"
                          key={index}
                          formControlProps={{
                            fullWidth: true,
                            value: workoutExercise.measurement,
                          }}
                          inputProps={{
                            name: 'measurement',
                            type: 'number',
                            value: workoutExercise.measurement,
                            onChange: (event) => this.handleChange(event, index),
                          }}
                        />,
                        <FormLabel>
                          {workoutExercise.exercise.measurement}
                        </FormLabel>,
                        <div>
                          <Button color="info" onClick={() => this.handleClickUp(index)}>
                            <ArrowUpward />
                          </Button>
                          <Button color="info" onClick={() => this.handleClickDown(index)}>
                            <ArrowDownward />
                          </Button>
                          <Button color="warning" onClick={() => this.handleClickRemove(index)}>
                            <Cancel />
                          </Button>
                        </div>,
                      ])}
                  />
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit}>Update workout</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <Dialog
            open={openDialog}
            onClose={this.handleCloseDialog}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
          >
            <DialogTitle id="dialog-title">Confirm the deletion</DialogTitle>
            <DialogContent>
              <DialogContentText id="dialog-description">
                Do you really want to delete the exercise?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDialog} color="transparent">
                Disagree
              </Button>
              <Button onClick={this.handleApplyDeletion} color="danger" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            place="tc"
            color={error ? 'danger' : 'success'}
            icon={error ? ErrorOutline : CheckCircleOutline}
            message={error || 'Workout successfully created!'}
            open={openSnackbar}
            closeNotification={this.handleCloseSnackbar}
            close
          />
        </GridContainer>
      </div>
    )
  }
}

EditWorkout.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  exercises: PropTypes.array,
  workout: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
}

EditWorkout.defaultProps = {
  exercises: [],
  workout: {},
  error: '',
}

const mapStateToProps = store => ({
  workout: store.workout.workout,
  exercises: store.exercises.exercises,
  error: store.workout.error,
})

export default connect(mapStateToProps)(withStyles(createWorkoutStyle)(EditWorkout))
