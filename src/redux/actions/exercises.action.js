import * as API from '../../api/exercise'

const NEW_EXERCISE = 'NEW_EXERCISE'
export const NEW_EXERCISE_PENDING = 'NEW_EXERCISE_PENDING'
export const NEW_EXERCISE_REJECTED = 'NEW_EXERCISE_REJECTED'
export const NEW_EXERCISE_FULFILLED = 'NEW_EXERCISE_FULFILLED'

export const createExercise = data => async dispatch => {
  await dispatch({
    type: NEW_EXERCISE,
    payload: API.createExercise(data),
  })
}
