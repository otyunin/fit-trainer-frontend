import * as API from '../../api/workout'
import { DELETE_WORKOUT, GET_WORKOUT, GET_WORKOUT_DATES, NEW_WORKOUT, UPDATE_WORKOUT } from './index'

export const getWorkoutDates = () => async dispatch => {
  await dispatch({
    type: GET_WORKOUT_DATES,
    payload: API.getWorkoutDates(),
  })
}

export const createWorkout = (data, date) => async dispatch => {
  await dispatch({
    type: NEW_WORKOUT,
    payload: API.createWorkout(data, date),
  })
}

export const getWorkout = date => async dispatch => {
  await dispatch({
    type: GET_WORKOUT,
    payload: API.getWorkout(date),
  })
}

export const updateWorkout = (data, date) => async dispatch => {
  await dispatch({
    type: UPDATE_WORKOUT,
    payload: API.updateWorkout(data, date),
  })
}

export const deleteWorkout = date => async dispatch => {
  await dispatch({
    type: DELETE_WORKOUT,
    payload: API.deleteWorkout(date),
  })
}
