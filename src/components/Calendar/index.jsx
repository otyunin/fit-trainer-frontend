import React from 'react'
import PropTypes from 'prop-types'
import InfiniteCalendar, { Calendar, withMultipleDates } from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'
import moment from 'moment'
import multipleDateInterpolation from 'utils/dateInterpolation'

class CustomCalendar extends React.Component {
  state = {
    selected: [],
  }

  handleSelect = (selectedDate) => {
    const { selected } = this.state
    const { onSelectDate } = this.props
    const isSelected = !!selected.find(date => moment(date).isSame(moment(selectedDate)))
    if (isSelected) {
      selected.pop()
      onSelectDate(null)
    } else {
      selected.shift()
      selected.push(selectedDate)
      onSelectDate(selectedDate)
    }
    this.setState({ selected })
  }

  chooseColor = (selectedDate) => {
    const { dates } = this.props
    const index = dates.indexOf(moment.utc(selectedDate, 'YYYY-MM-DD').toISOString())
    if (index > -1) {
      return '#6cf47d'
    }
    return '#559fff'
  }

  render() {
    const { dates } = this.props
    return (
      <InfiniteCalendar
        Component={withMultipleDates(Calendar)}
        width="100%"
        height={400}
        selected={dates}
        interpolateSelection={multipleDateInterpolation(dates)}
        theme={{
          selectionColor: this.chooseColor,
        }}
        onSelect={(date) => this.handleSelect(date)}
      />
    )
  }
}

CustomCalendar.propTypes = {
  dates: PropTypes.array.isRequired,
  onSelectDate: PropTypes.func.isRequired,
}

export default CustomCalendar
