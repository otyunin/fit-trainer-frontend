import React from 'react'
import PropTypes from 'prop-types'
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'
import moment from 'moment'

const today = new Date()
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)

class CustomCalendar extends React.Component {
  state = {
    selected: [],
  }

  componentDidMount() {
    const { dates } = this.props
    this.setState({ selected: dates })
  }

  handleSelect = (selectedDate) => {
    const { selected } = this.state
    selectedDate = moment.utc(selectedDate, 'YYYY-MM-DD').format()
    const { dates } = this.props
    const index = selected.indexOf(selectedDate)
    if (selected.length > dates.length) {
      selected.pop()
    } else {
      selected.push(selectedDate)
    }
    this.setState({ selected })
  }

  render() {
    const { selected } = this.state
    const { dates } = this.props
    return (
      <InfiniteCalendar
        Component={withMultipleDates(Calendar)}
        width="100%"
        height={400}
        selected={selected}
        minDate={lastWeek}
        interpolateSelection={defaultMultipleDateInterpolation}
        theme={{
          selectionColor: selectDate => (dates.findIndex(date => date === moment.utc(selectDate, 'YYYY-MM-DD').toISOString()) > -1 ? '#6cf47d' : '#559FFF'),
        }}
        onSelect={(date) => this.handleSelect(date)}
      />
    )
  }
}

CustomCalendar.propTypes = {
  dates: PropTypes.array.isRequired,
}

export default CustomCalendar
