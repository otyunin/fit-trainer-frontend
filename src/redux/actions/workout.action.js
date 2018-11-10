import * as API from '../../api/workout'

const NEW_WORKOUT = 'NEW_WORKOUT'
export const NEW_WORKOUT_PENDING = 'NEW_WORKOUT_PENDING'
export const NEW_WORKOUT_REJECTED = 'NEW_WORKOUT_REJECTED'
export const NEW_WORKOUT_FULFILLED = 'NEW_WORKOUT_FULFILLED'

const GET_WORKOUT = 'GET_WORKOUT'
export const GET_WORKOUT_PENDING = 'GET_WORKOUT_PENDING'
export const GET_WORKOUT_REJECTED = 'GET_WORKOUT_REJECTED'
export const GET_WORKOUT_FULFILLED = 'GET_WORKOUT_FULFILLED'

const UPDATE_WORKOUT = 'UPDATE_WORKOUT'
export const UPDATE_WORKOUT_PENDING = 'UPDATE_WORKOUT_PENDING'
export const UPDATE_WORKOUT_REJECTED = 'UPDATE_WORKOUT_REJECTED'
export const UPDATE_WORKOUT_FULFILLED = 'UPDATE_WORKOUT_FULFILLED'

const GET_WORKOUT_DATES = 'GET_WORKOUT_DATES'
export const GET_WORKOUT_DATES_PENDING = 'GET_WORKOUT_DATES_PENDING'
export const GET_WORKOUT_DATES_REJECTED = 'GET_WORKOUT_DATES_REJECTED'
export const GET_WORKOUT_DATES_FULFILLED = 'GET_WORKOUT_DATES_FULFILLED'

const DELETE_WORKOUT = 'DELETE_WORKOUT'
export const DELETE_WORKOUT_PENDING = 'DELETE_WORKOUT_PENDING'
export const DELETE_WORKOUT_REJECTED = 'DELETE_WORKOUT_REJECTED'
export const DELETE_WORKOUT_FULFILLED = 'DELETE_WORKOUT_FULFILLED'

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
