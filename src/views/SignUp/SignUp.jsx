import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { ErrorMessage, Form } from 'formik'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import Danger from 'components/Typography/Danger'
import formik from './formik'

const styles = theme => ({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: '\'Roboto\', \'Helvetica\', \'Arial\', sans-serif',
    marginBottom: '3px',
    textDecoration: 'none',
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  errorMessage: {
    marginTop: '27px',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
})

const SignUp = ({ ...props }) => {
  const {
    classes,
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
  } = props

  const errorEmail = errors.email && touched.email
  const errorPassword = errors.password && touched.password
  const errorRepeatPassword = errors.repeatPassword && touched.repeatPassword

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Form>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Register with Fit Trainer App</h4>
                <p className={classes.cardCategoryWhite}>Please, enter your email and password</p>
              </CardHeader>
              <CardBody>
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      error={errorEmail}
                      success={!!(!errorEmail && values.email)}
                      formControlProps={{
                        fullWidth: true,
                        value: values.email,
                        onChange: handleChange,
                        onBlur: handleBlur,
                      }}
                      inputProps={{
                        name: 'email',
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.errorMessage}>
                      <ErrorMessage component={Danger} name="email" />
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Password"
                      id="password"
                      error={errorPassword}
                      success={!!(!errorPassword && values.password)}
                      formControlProps={{
                        fullWidth: true,
                        value: values.email,
                        onChange: handleChange,
                        onBlur: handleBlur,
                      }}
                      inputProps={{
                        name: 'password',
                        type: 'password',
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.errorMessage}>
                      <ErrorMessage component={Danger} name="password" />
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Repeat password"
                      id="repeat-password"
                      error={errorRepeatPassword}
                      success={!!(!errorRepeatPassword && values.repeatPassword)}
                      formControlProps={{
                        fullWidth: true,
                        value: values.repeatPassword,
                        onChange: handleChange,
                        onBlur: handleBlur,
                      }}
                      inputProps={{
                        name: 'repeatPassword',
                        type: 'password',
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.errorMessage}>
                      <ErrorMessage component={Danger} name="repeatPassword" />
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter className={classes.cardActions}>
                <Button color="primary" type="submit" disabled={isSubmitting}>
                  Sign up
                </Button>
                <Link to="/signin" color="primary">
                  already have an account? sign-in
                </Link>
              </CardFooter>
            </Card>
          </Form>
        </GridItem>
      </GridContainer>
    </div>
  )
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
}

SignUp.defaultProps = {
  error: '',
}

const mapStateToProps = store => ({
  error: store.errorRegister,
})

export default connect(mapStateToProps)(formik(withStyles(styles)(SignUp)))
