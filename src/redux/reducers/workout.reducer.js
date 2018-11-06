import {
  NEW_WORKOUT_PENDING,
  NEW_WORKOUT_REJECTED,
  NEW_WORKOUT_FULFILLED,
} from '../actions/workout.action'

const initialState = {
  loading: false,
  workout: null,
  error: null,
}

const workout = (state = initialState, { type, payload }) => {
  switch (type) {
    case NEW_WORKOUT_PENDING:
      return {
        ...state,
        loading: true,
      }

    case NEW_WORKOUT_REJECTED:
      return {
        ...state,
        error: payload,
        loading: false,
      }

    case NEW_WORKOUT_FULFILLED: {
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

export default workout
