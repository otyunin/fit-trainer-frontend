import {
  NEW_WORKOUT_PENDING,
  NEW_WORKOUT_REJECTED,
  NEW_WORKOUT_FULFILLED,
  GET_WORKOUT_PENDING,
  GET_WORKOUT_REJECTED,
  GET_WORKOUT_FULFILLED,
  UPDATE_WORKOUT_PENDING,
  UPDATE_WORKOUT_REJECTED,
  UPDATE_WORKOUT_FULFILLED,
} from '../actions/workout.action'

const initialState = {
  loading: false,
  workout: null,
  error: null,
}

const workout = (state = initialState, { type, payload }) => {
  switch (type) {
    // CREATE
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
    // GET
    case GET_WORKOUT_PENDING:
      return {
        ...state,
        loading: true,
      }

    case GET_WORKOUT_REJECTED:
      return {
        ...state,
        error: payload,
        loading: false,
      }

    case GET_WORKOUT_FULFILLED: {
      return {
        ...state,
        error: null,
        workout: payload.workout,
        loading: false,
      }
    }
    // UPDATE
    case UPDATE_WORKOUT_PENDING:
      return {
        ...state,
        loading: true,
      }

    case UPDATE_WORKOUT_REJECTED:
      return {
        ...state,
        error: payload,
        loading: false,
      }

    case UPDATE_WORKOUT_FULFILLED: {
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
