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

class EditExercises extends React.Component {
  state = {
    exercises: [
      { order: 0, name: 'Exercise 1', type: 'kilograms' },
      { order: 1, name: 'Exercise 2', type: 'grams' },
      { order: 2, name: 'Exercise 3', type: 'seconds' },
      { order: 3, name: 'Exercise 4', type: 'hours' },
    ],
    open: false,
    indexToRemove: null,
  }

  handleCloseDialog = () => {
    this.setState({ open: false, indexToRemove: null })
  }

  handleClickRemove = target => {
    this.setState({ open: true, indexToRemove: target })
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
    this.setState({ exercises: newExercises, open: false })
  }

  render() {
    const { classes } = this.props
    const { exercises, open } = this.state
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
                    tableData={exercises.sort((a, b) => a.order - b.order).map((exercise, index) => [
                      <CustomInput
                        labelText="Exercise name"
                        id="exercise"
                        name="exercise"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: exercise.name,
                        }}
                      />,
                      <CustomSelect
                        labelText="Measurement type"
                        id="measurement-type"
                        value={exercise.type}
                        selectData={['kilograms', 'grams', 'seconds', 'hours', 'metres', 'kilimeters']}
                        inputProps={{
                          name: 'measurementType',
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
                <Button color="primary">Update exercises</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <Dialog
          open={open}
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
      </div>
    )
  }
}

EditExercises.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(createWorkoutStyle)(EditExercises)
