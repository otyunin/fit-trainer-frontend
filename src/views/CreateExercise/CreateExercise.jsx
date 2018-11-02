import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'formik'
import { CheckCircleOutline, ErrorOutline } from '@material-ui/icons'
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
import Snackbar from 'components/Snackbar/Snackbar'

import createExerciseStyle from 'assets/jss/material-dashboard-react/views/createExerciseStyle'
import formik from './formik'

const CreateExercise = ({ ...props }) => {
  const {
    classes,
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    error,
    status,
  } = props

  const errorName = errors.name && touched.name
  const errorMeasurement = errors.measurement && touched.measurement

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Form>
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
                      error={errorName}
                      success={!!(!errorName && values.name)}
                      formControlProps={{
                        fullWidth: true,
                        onChange: handleChange,
                        onBlur: handleBlur,
                      }}
                      inputProps={{
                        value: values.name,
                        name: 'name',
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
                      labelProps={{ shrink: true }}
                      value={values.measurement}
                      error={!!(!values.measurement && touched.measurement)}
                      success={!!(!errorMeasurement && values.measurement)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'measurement',
                        onChange: handleChange,
                        onBlur: handleBlur,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter className={classes.cardActions}>
                <Button color="primary" type="submit" disabled={isSubmitting}>
                  Create exercise
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </GridItem>
        <Snackbar
          place="tc"
          color={error ? 'danger' : 'success'}
          icon={error ? ErrorOutline : CheckCircleOutline}
          message={(!error ? status.message : error) || ''}
          open={status.open}
        />
      </GridContainer>
    </div>
  )
}

CreateExercise.propTypes = {
  classes: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
  status: PropTypes.object,
}

CreateExercise.defaultProps = {
  error: null,
  status: {},
}

const mapStateToProps = store => ({
  error: store.exercises.error,
})

export default connect(mapStateToProps)(formik(withStyles(createExerciseStyle)(CreateExercise)))
