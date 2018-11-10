import * as API from '../../api/exercise'
import { GET_EXERCISES, NEW_EXERCISE, UPDATE_EXERCISES } from './index'

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
