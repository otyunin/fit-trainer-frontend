import {
  NEW_EXERCISE_PENDING,
  NEW_EXERCISE_REJECTED,
  NEW_EXERCISE_FULFILLED,
} from '../actions/exercises.action'

const initialState = {
  loading: false,
  exercises: null,
  error: null,
}

const exercises = (state = initialState, { type, payload }) => {
  switch (type) {
    case NEW_EXERCISE_PENDING:
      return {
        ...state,
        loading: true,
      }

    case NEW_EXERCISE_REJECTED:
      return {
        ...state,
        error: payload,
        loading: false,
      }

    case NEW_EXERCISE_FULFILLED: {
      return {
        ...state,
        error: null,
        loading: false,
      }
    }

    default:
      return state
  }
}

export default exercises
