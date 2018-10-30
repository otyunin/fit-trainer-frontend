import React from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'

import GridContainer from 'components/Grid/GridContainer.jsx'
import Button from 'components/CustomButtons/Button'

const today = new Date()
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)

const Dashboard = () => (
  <div>
    <GridContainer style={{ maxWidth: 400 }}>
      <Grid container justify="space-between">
        <Button color="primary">Add new exercise</Button>
        <Button color="primary">Add new workout</Button>
      </Grid>
      <InfiniteCalendar
        width="100%"
        height={400}
        selected={today}
        disabledDays={[0, 6]}
        minDate={lastWeek}
      />
    </GridContainer>
  </div>
)

Dashboard.propTypes = {}

export default Dashboard
