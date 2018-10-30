import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid/Grid'
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

import createWorkoutStyle from 'assets/jss/material-dashboard-react/views/createWorkoutStyle'

const EditExercises = ({ classes }) => (
  <div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={10}>
        <Card>
          <CardHeader color="primary" className={classes.cardHeader}>
            <h4 className={classes.cardTitleWhite}>New workout</h4>
          </CardHeader>
          <CardBody>
            <Grid container alignItems="center">
              <Table
                tableData={[1, 2, 3, 4].map(() => [
                  <CustomSelect
                    labelText="Exercise name"
                    id="exercise"
                    selectData={[1, 2, 3, 4].map(valueSelect => `Exercise #${valueSelect}`)}
                    inputProps={{
                      name: 'exercise',
                    }}
                    labelProps={{ shrink: true }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />,
                  <CustomSelect
                    labelText="Measurement type"
                    id="measurement-type"
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
                    <Button color="info">
                      <ArrowUpward />
                    </Button>
                    <Button color="info">
                      <ArrowDownward />
                    </Button>
                    <Button color="warning">
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
  </div>
)

EditExercises.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(createWorkoutStyle)(EditExercises)
