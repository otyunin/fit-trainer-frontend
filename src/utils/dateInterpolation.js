import moment from 'moment'
import store from 'index'
import { push } from 'connected-react-router'

const multipleDateInterpolation = workoutDates => (date, selected) => {
  const selectedMap = selected.map(selectedDate => moment(selectedDate).format('YYYY-MM-DD'))
  const workoutDatesMap = workoutDates.map(workoutDate => moment(workoutDate).format('YYYY-MM-DD'))

  const indexSelected = selectedMap.indexOf(moment(date).format('YYYY-MM-DD'))
  const indexWorkout = workoutDatesMap.indexOf(moment(date).format('YYYY-MM-DD'))

  if (indexSelected === -1) return [].concat(workoutDates, date)
  if (indexWorkout === -1) return workoutDates
  store.dispatch(push(`/edit-workout/${moment(date).format('YYYY-MM-DD')}`))
  return selected
}

export default multipleDateInterpolation
