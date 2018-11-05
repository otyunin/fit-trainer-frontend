import * as API from '../../api/exercise'

const NEW_EXERCISE = 'NEW_EXERCISE'
export const NEW_EXERCISE_PENDING = 'NEW_EXERCISE_PENDING'
export const NEW_EXERCISE_REJECTED = 'NEW_EXERCISE_REJECTED'
export const NEW_EXERCISE_FULFILLED = 'NEW_EXERCISE_FULFILLED'

const GET_EXERCISES = 'GET_EXERCISES'
export const GET_EXERCISES_PENDING = 'GET_EXERCISES_PENDING'
export const GET_EXERCISES_REJECTED = 'GET_EXERCISES_REJECTED'
export const GET_EXERCISES_FULFILLED = 'GET_EXERCISES_FULFILLED'

const UPDATE_EXERCISES = 'UPDATE_EXERCISES'
export const UPDATE_EXERCISES_PENDING = 'UPDATE_EXERCISES_PENDING'
export const UPDATE_EXERCISES_REJECTED = 'UPDATE_EXERCISES_REJECTED'
export const UPDATE_EXERCISES_FULFILLED = 'UPDATE_EXERCISES_FULFILLED'

export const createExercise = data => async dispatch => {
  await dispatch({
    type: NEW_EXERCISE,
    payload: API.createExercise(data),
  })
}

export const getExercises = () => async dispatch => {
  await dispatch({
    type: GET_EXERCISES,
    payload: API.getExercises,
  })
}

export const updateExercises = data => async dispatch => {
  await dispatch({
    type: UPDATE_EXERCISES,
    payload: API.updateExercises(data),
  })
}
