/* eslint-disable no-underscore-dangle,react/jsx-one-expression-per-line */
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
import { push } from 'connected-react-router'
import { getExercises } from 'redux/actions/exercises.action'
import { deleteWorkout, getWorkout, updateWorkout } from 'redux/actions/workout.action'
import moment from 'moment'
import validateWorkout from 'utils/validateWorkout'
import _ from 'lodash'
import { getAbbreviation } from 'utils/measurements'
import { handleClickDown, handleClickUp } from 'utils/movement'

class EditWorkout extends React.Component {
  state = {
    workout: {},
    workoutExercises: [],
    openDialog: false,
    openSnackbar: false,
    snackbarMessage: '',
    indexToRemove: null,
    removeWorkout: false,
    isMounted: false,
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    dispatch(getWorkout(match.params.date))
    dispatch(getExercises())
    this.setState({ isMounted: true })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { workout } = this.props
    if (nextProps.workout && workout !== nextProps.workout) {
      this.setState({ workout: nextProps.workout, workoutExercises: nextProps.workout.exercises })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { success, dispatch } = this.props
    if (prevProps.success !== success) {
      if (success) {
        dispatch(push('/dashboard'))
      }
    }
  }

  componentWillUnmount() {
    this.setState({ isMounted: true })
  }

  handleAddExercises = () => {
    const { workoutExercises } = this.state
    const body = { exercise: {}, repeats: 0, measurement: 0, order: workoutExercises.length }
    workoutExercises.push(body)
    this.setState({ workoutExercises })
  }

  handleChangeSelect = (event, target) => {
    const { exercises } = this.props
    const { workoutExercises } = this.state
    workoutExercises[target].exercise = exercises.find(exercise => exercise._id === event.target.value)
    this.setState({ workoutExercises })
  }

  handleChange = (event, target) => {
    const { workoutExercises } = this.state
    workoutExercises[target][event.target.name] = event.target.value
    this.setState({ workoutExercises })
  }

  handleClickUp = (target) => {
    const { workoutExercises } = this.state
    const newWorkout = handleClickUp(target, workoutExercises)
    this.setState({ workoutExercises: newWorkout })
  }

  handleClickDown = (target) => {
    const { workoutExercises } = this.state
    const newWorkout = handleClickDown(target, workoutExercises)
    this.setState({ workoutExercises: newWorkout })
  }

  handleCloseDialog = () => {
    this.setState({ openDialog: false, indexToRemove: null, removeWorkout: false })
  }

  handleCloseSnackbar = () => {
    this.setState({ openSnackbar: false, snackbarMessage: '' })
  }

  handleClickRemove = target => {
    this.setState({ openDialog: true, indexToRemove: target })
  }

  handleClickRemoveWorkout = () => {
    this.setState({ openDialog: true, removeWorkout: true })
  }

  handleApplyDeletion = () => {
    const { workoutExercises, indexToRemove, removeWorkout } = this.state
    const { match, dispatch } = this.props
    if (!removeWorkout) {
      const newWorkout = workoutExercises.map((workoutExercise, index) => {
        if (index > indexToRemove) {
          workoutExercise.order -= 1
        }
        return workoutExercise
      })
      newWorkout.splice(indexToRemove, 1)
      this.setState({ workoutExercises: newWorkout, openDialog: false })
    } else {
      dispatch(deleteWorkout(match.params.date))
      this.setState({ openDialog: false })
    }
  }

  handleSubmit = async () => {
    const { workoutExercises, workout, isMounted } = this.state
    const { dispatch, match } = this.props
    if (isMounted) {
      // replace exercise objects with their id-s
      const newExercises = workoutExercises.map(workoutExercise => ({
        ...workoutExercise, exercise: workoutExercise.exercise._id,
      }))
      workout.exercises = newExercises
      // VALIDATION
      const errors = await validateWorkout(newExercises)
      // Add property 'errors' to the workout
      const workoutWithErrors = workoutExercises.map((workoutExercise, index) => {
        const errorsValidation = {}
        errors.forEach(err => {
          if (err.path[0] === index) {
            errorsValidation[err.path[1]] = err.message
          }
        })
        workoutExercise.errors = errorsValidation
        return workoutExercise
      })
      this.setState({ workoutExercises: workoutWithErrors })
      // Dispatch action if workout is valid
      if (errors.length === 0) dispatch(updateWorkout(workout, match.params.date))
      this.setState({
        openSnackbar: true,
        snackbarMessage: errors.length > 0 ? 'Validation error' : '',
      })
      setTimeout(() => this.setState({ openSnackbar: false }), 6000)
    }
  }

  render() {
    const { classes, exercises, error, match } = this.props
    const {
      workoutExercises,
      openDialog,
      openSnackbar,
      snackbarMessage,
      removeWorkout,
    } = this.state

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
                      {moment(match.params.date, 'YYYY-MM-DD').format('ddd, MMM Do YYYY')}
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
                    tableData={!workoutExercises ? [] : workoutExercises.sort((a, b) => a.order - b.order)
                      .map((workoutExercise, index) => [
                        <CustomSelect
                          labelText="Exercise name"
                          id="exercise"
                          key={index}
                          selectData={!exercises ? [] : exercises.map(exercise => exercise)}
                          value={_.isEmpty(workoutExercise.exercise) ? '' : workoutExercise.exercise._id}
                          showKey="name"
                          returnKey="_id"
                          helperText={workoutExercise.errors ? workoutExercise.errors.exercise : ''}
                          inputProps={{
                            name: 'exercise',
                            onChange: (event) => this.handleChangeSelect(event, index),
                            renderValue: () => workoutExercise.exercise.name,
                          }}
                          labelProps={{ shrink: true }}
                          formControlProps={{
                            fullWidth: true,
                            error: workoutExercise.errors && !!workoutExercise.errors.exercise,
                          }}
                        />,
                        <CustomInput
                          labelText="Repeats"
                          id="repeats"
                          key={index}
                          helperText={workoutExercise.errors ? workoutExercise.errors.repeats : ''}
                          formControlProps={{
                            fullWidth: true,
                            error: workoutExercise.errors && !!workoutExercise.errors.repeats,
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
                          helperText={workoutExercise.errors ? workoutExercise.errors.measurement : ''}
                          formControlProps={{
                            fullWidth: true,
                            value: workoutExercise.measurement,
                            error: workoutExercise.errors && !!workoutExercise.errors.measurement,
                          }}
                          inputProps={{
                            name: 'measurement',
                            type: 'number',
                            value: workoutExercise.measurement,
                            onChange: (event) => this.handleChange(event, index),
                          }}
                        />,
                        <FormLabel>
                          {getAbbreviation(workoutExercise.exercise.measurement)}
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
                <Grid container justify="space-between">
                  <Button color="primary" onClick={this.handleSubmit}>Update workout</Button>
                  <Button color="danger" onClick={this.handleClickRemoveWorkout}>Delete workout</Button>
                </Grid>
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
                Do you really want to delete the {removeWorkout ? 'workout' : 'exercise'}?
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
            color={error || snackbarMessage ? 'danger' : 'success'}
            icon={error || snackbarMessage ? ErrorOutline : CheckCircleOutline}
            message={snackbarMessage || error || 'Workout successfully updated!'}
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
  success: PropTypes.bool,
}

EditWorkout.defaultProps = {
  exercises: [],
  workout: {},
  error: '',
  success: false,
}

const mapStateToProps = store => ({
  workout: store.workout.workout,
  exercises: store.exercises.exercises,
  error: store.workout.error,
  success: store.workout.successDelete,
})

export default connect(mapStateToProps)(withStyles(createWorkoutStyle)(EditWorkout))
