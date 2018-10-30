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
import { Link } from 'react-router-dom'

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

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  render() {
    const { classes } = this.props
    const { email, password } = this.state
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.handleSubmit}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Sign into Fit Trainer App</h4>
                  <p className={classes.cardCategoryWhite}>Please, enter your email and password</p>
                </CardHeader>
                <CardBody>
                  <GridContainer alignItems="center">
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Email address"
                        id="email-address"
                        onChange={this.handleChange}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'email',
                          onChange: this.handleChange,
                          value: email,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer alignItems="center">
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'password',
                          onChange: this.handleChange,
                          value: password,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter className={classes.cardActions}>
                  <Button color="primary" type="submit">
                    Sign in
                  </Button>
                  <Link to="/signup" color="primary">
                    first time user? sign-up
                  </Link>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignIn)
