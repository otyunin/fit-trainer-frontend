import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import { NavLink } from 'react-router-dom'
import { verifyEmail } from 'redux/actions/auth.action'

const styles = {
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
  },
}

class VerifyEmail extends React.Component {
  state = {
    email: '',
    verificationCode: '',
  }

  componentDidMount() {
    const { params } = this.props.match
    this.setState({ email: params.email, verificationCode: params.verificationCode })
  }

  handleSubmit = (event) => {
    const { dispatch } = this.props
    event.preventDefault()
    dispatch(verifyEmail(this.state))

  }

  render() {
    const { classes } = this.props
    const { email, verificationCode } = this.state
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.handleSubmit}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    Email verification to finish registration with Fit Trainer App
                  </h4>
                  <p className={classes.cardCategoryWhite}>
                    Please, confirm email address
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Email address"
                        id="email-address"
                        formControlProps={{
                          fullWidth: true,
                          disabled: true,
                        }}
                        inputProps={{
                          value: email,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="VerificationCode"
                        id="verification-code"
                        formControlProps={{
                          fullWidth: true,
                          disabled: true,
                          value: verificationCode,
                        }}
                        inputProps={{
                          value: verificationCode,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter className={classes.cardActions}>
                  <Button color="primary" type="submit">Verify email</Button>
                  <NavLink to="/signin" color="primary">already have an account? sign-in</NavLink>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

VerifyEmail.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

VerifyEmail.defaultProps = {
  match: {},
}

export default connect()(withStyles(styles)(VerifyEmail))
