import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
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
import Snackbar from 'components/Snackbar/Snackbar'

import createWorkoutStyle from 'assets/jss/material-dashboard-react/views/createWorkoutStyle'
import { connect } from 'react-redux'
import { getExercises, updateExercises } from 'redux/actions/exercises.action'

class EditExercises extends React.Component {
  state = {
    exercises: [],
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

  handleCloseDialog = () => {
    this.setState({ openDialog: false, indexToRemove: null })
  }

  handleCloseSnackbar = () => {
    this.setState({ openSnackbar: false })
  }

  handleClickRemove = target => {
    this.setState({ openDialog: true, indexToRemove: target })
  }

  handleClickUp = target => {
    const { exercises } = this.state
    if (target !== 0) {
      const newExercises = exercises.map((exercise, index) => {
        if (index === target - 1) {
          exercise.order += 1
        }
        if (index === target) {
          exercise.order -= 1
        }
        return exercise
      })
      this.setState({ exercises: newExercises })
    } else {
      const newExercises = exercises.map((exercise, index) => {
        if (index > target) {
          exercise.order -= 1
        }
        if (index === target) {
          exercise.order = exercises.length - 1
        }
        return exercise
      })
      this.setState({ exercises: newExercises })
    }
  }

  handleClickDown = target => {
    const { exercises } = this.state
    if (target !== exercises.length - 1) {
      const newExercises = exercises.map((exercise, index) => {
        if (index === target + 1) {
          exercise.order -= 1
        }
        if (index === target) {
          exercise.order += 1
        }
        return exercise
      })
      this.setState({ exercises: newExercises })
    } else {
      const newExercises = exercises.map((exercise, index) => {
        if (index < target) {
          exercise.order += 1
        }
        if (index === target) {
          exercise.order = 0
        }
        return exercise
      })
      this.setState({ exercises: newExercises })
    }
  }

  handleApplyDeletion = () => {
    const { exercises, indexToRemove } = this.state
    const newExercises = exercises.map((exercise, index) => {
      if (index > indexToRemove) {
        exercise.order -= 1
      }
      return exercise
    })
    newExercises.splice(indexToRemove, 1)
    this.setState({ exercises: newExercises, openDialog: false })
  }

  handleSubmit = () => {
    const { exercises } = this.state
    const { dispatch } = this.props
    dispatch(updateExercises(exercises))
    this.setState({ openSnackbar: true })
    setTimeout(() => this.setState({ openSnackbar: false }), 6000)
  }

  handleChange = (event, target) => {
    const { exercises } = this.state
    exercises[target][event.target.name] = event.target.value
    this.setState(exercises)
  }

  render() {
    const { classes, error } = this.props
    const { openDialog, exercises, openSnackbar } = this.state
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4 className={classes.cardTitleWhite}>Edit exercises</h4>
              </CardHeader>
              <CardBody>
                <Grid container alignItems="center">
                  <Table
                    tableData={!exercises ? [] : exercises.sort((a, b) => a.order - b.order).map((exercise, index) => [
                      <CustomInput
                        labelText="Exercise name"
                        id="exercise"
                        name="exercise"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'name',
                          onChange: (event) => this.handleChange(event, index),
                          value: exercise.name,
                        }}
                      />,
                      <CustomSelect
                        labelText="Measurement type"
                        id="measurement-type"
                        value={exercise.measurement}
                        selectData={['kilograms', 'grams', 'seconds', 'hours', 'metres', 'kilometers']}
                        inputProps={{
                          name: 'measurement',
                          onChange: (event) => this.handleChange(event, index),
                        }}
                        labelProps={{ shrink: true }}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />,
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
                <Button color="primary" onClick={this.handleSubmit}>Update exercises</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
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
          message={error || 'Exercises successfully updated!'}
          open={openSnackbar}
          closeNotification={this.handleCloseSnackbar}
          close
        />
      </div>
    )
  }
}

EditExercises.propTypes = {
  classes: PropTypes.object.isRequired,
  exercises: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
}

EditExercises.defaultProps = {
  exercises: [],
  error: '',
}

const mapStateToProps = store => ({
  error: store.exercises.error,
  exercises: store.exercises.exercises,
})

export default connect(mapStateToProps)(withStyles(createWorkoutStyle)(EditExercises))
