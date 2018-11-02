import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import CustomSelect from 'components/CustomSelect/CustomSelect'

import createExerciseStyle from 'assets/jss/material-dashboard-react/views/createExerciseStyle'
import { connect } from 'react-redux'
import { createExercise } from '../../redux/actions/exercises.action'

class CreateExercise extends React.Component {
  state = {
    name: '',
    measurement: '',
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { dispatch } = this.props
    const { name, measurement } = this.state
    dispatch(createExercise({ name, measurement }))
  }

  render() {
    const { classes } = this.props
    const { name, measurement } = this.state
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.handleSubmit}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Create new exercise</h4>
                  <p className={classes.cardCategoryWhite}>Please, add a new exercise name and measurement type</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Exercise Name"
                        id="exercise-name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'name',
                          onChange: this.handleChange,
                          value: name,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomSelect
                        labelText="Measurement type"
                        id="measurement-type"
                        selectData={['kilograms', 'grams', 'seconds', 'hours', 'metres', 'kilimeters']}
                        inputProps={{
                          name: 'measurement',
                          onChange: this.handleChange,
                        }}
                        value={measurement}
                        labelProps={{ shrink: true }}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter className={classes.cardActions}>
                  <Button color="primary" type="submit">
                    Create exercise
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

CreateExercise.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(withStyles(createExerciseStyle)(CreateExercise))
