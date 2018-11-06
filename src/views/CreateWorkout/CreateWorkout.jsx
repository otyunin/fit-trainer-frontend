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
import { ArrowDownward, ArrowUpward, Cancel, CheckCircleOutline, ErrorOutline } from '@material-ui/icons'
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
import { getExercises } from 'redux/actions/exercises.action'
import { createWorkout } from '../../redux/actions/workout.action'
import Snackbar from '../../components/Snackbar/Snackbar'

class CreateWorkout extends React.Component {
  state = {
    exercises: [],
    workout: [],
    openDialog: false,
    openSnackbar: false,
    indexToRemove: null,
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(getExercises())
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { exercises } = this.props
    if (nextProps.exercises && exercises !== nextProps.exercises) {
      this.setState({ exercises: nextProps.exercises })
    }
  }

  handleAddExercises = () => {
    const { workout } = this.state
    const body = { exercise: {}, repeats: 0, measurement: '', order: workout.length }
    workout.push(body)
    this.setState({ workout })
  }

  handleChangeSelect = (event, target) => {
    const { workout, exercises } = this.state
    const foundExercise = exercises.filter(exercise => exercise._id === event.target.value)
    workout[target].exercise = foundExercise[0]
    this.setState({ workout })
  }

  handleChange = (event, target) => {
    const { workout } = this.state
    workout[target][event.target.name] = event.target.value
    this.setState({ workout })
  }

  handleClickUp = target => {
    const { workout } = this.state
    if (target !== 0) {
      const newWorkout = workout.map((workoutExercise, index) => {
        if (index === target - 1) {
          workoutExercise.order += 1
        }
        if (index === target) {
          workoutExercise.order -= 1
        }
        return workoutExercise
      })
      this.setState({ workout: newWorkout })
    } else {
      const newWorkout = workout.map((workoutExercise, index) => {
        if (index > target) {
          workoutExercise.order -= 1
        }
        if (index === target) {
          workoutExercise.order = workout.length - 1
        }
        return workoutExercise
      })
      this.setState({ workout: newWorkout })
    }
  }

  handleClickDown = target => {
    const { workout } = this.state
    if (target !== workout.length - 1) {
      const newWorkout = workout.map((workoutExercise, index) => {
        if (index === target + 1) {
          workoutExercise.order -= 1
        }
        if (index === target) {
          workoutExercise.order += 1
        }
        return workoutExercise
      })
      this.setState({ workout: newWorkout })
    } else {
      const newWorkout = workout.map((workoutExercise, index) => {
        if (index < target) {
          workoutExercise.order += 1
        }
        if (index === target) {
          workoutExercise.order = 0
        }
        return workoutExercise
      })
      this.setState({ workout: newWorkout })
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
    const { workout, indexToRemove } = this.state
    const newWorkout = workout.map((workoutExercise, index) => {
      if (index > indexToRemove) {
        workoutExercise.order -= 1
      }
      return workoutExercise
    })
    newWorkout.splice(indexToRemove, 1)
    this.setState({ workout: newWorkout, openDialog: false })
  }

  handleSubmit = () => {
    const { workout } = this.state
    const { dispatch } = this.props
    const newWorkout = workout.map(workoutExercise => ({
      ...workoutExercise, exercise: workoutExercise.exercise._id,
    }))
    dispatch(createWorkout(newWorkout))
    this.setState({ openSnackbar: true })
    setTimeout(() => this.setState({ openSnackbar: false }), 6000)
  }

  render() {
    const { classes, exercises, error } = this.props
    const { workout, openDialog, openSnackbar } = this.state
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4 className={classes.cardTitleWhite}>New workout</h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <Button color="primary" onClick={this.handleAddExercises}>Add exercise</Button>
                </Grid>
                <Grid container alignItems="center">
                  <Table
                    tableData={workout.sort((a, b) => a.order - b.order)
                      .map((workoutExercises, index) => [
                        <CustomSelect
                          labelText="Exercise name"
                          id="exercise"
                          key={index}
                          selectData={!exercises ? [] : exercises.map(exercise => exercise)}
                          value={workoutExercises.exercise._id}
                          showKey="name"
                          returnKey="_id"
                          inputProps={{
                            name: 'exercise',
                            onChange: (event) => this.handleChangeSelect(event, index),
                            renderValue: () => workoutExercises.exercise.name,
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
                            value: workoutExercises.repeats,
                            onChange: (event) => this.handleChange(event, index),
                          }}
                        />,
                        <CustomInput
                          labelText="Measurement"
                          id="measurement"
                          key={index}
                          formControlProps={{
                            fullWidth: true,
                            value: workoutExercises.measurement,
                          }}
                          inputProps={{
                            name: 'measurement',
                            type: 'number',
                            value: workoutExercises.measurement,
                            onChange: (event) => this.handleChange(event, index),
                          }}
                        />,
                        <FormLabel>
                          {workoutExercises.exercise.measurement}
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
                <Button color="primary" onClick={this.handleSubmit}>Create workout</Button>
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

CreateWorkout.propTypes = {
  classes: PropTypes.object.isRequired,
  exercises: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
}

CreateWorkout.defaultProps = {
  exercises: [],
  error: '',
}

const mapStateToProps = store => ({
  exercises: store.exercises.exercises,
  error: store.workout.error,
})

export default connect(mapStateToProps)(withStyles(createWorkoutStyle)(CreateWorkout))
