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

export const createWorkout = data => async dispatch => {
  await dispatch({
    type: NEW_WORKOUT,
    payload: API.createWorkout(data),
  })
}

export const getWorkout = () => async dispatch => {
  await dispatch({
    type: GET_WORKOUT,
    payload: API.getWorkout(),
  })
}

export const updateWorkout = data => async dispatch => {
  await dispatch({
    type: UPDATE_WORKOUT,
    payload: API.updateWorkout(data),
  })
}
