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
  GET_WORKOUT_DATES_PENDING,
  GET_WORKOUT_DATES_REJECTED,
  GET_WORKOUT_DATES_FULFILLED,
} from '../actions/workout.action'

const initialState = {
  loading: false,
  workout: null,
  dates: [],
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
        error: payload.message,
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
        error: payload.message,
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
    // GET DATES
    case GET_WORKOUT_DATES_PENDING:
      return {
        ...state,
        loading: true,
      }

    case GET_WORKOUT_DATES_REJECTED:
      return {
        ...state,
        error: payload.message,
        loading: false,
      }

    case GET_WORKOUT_DATES_FULFILLED: {
      return {
        ...state,
        error: null,
        dates: payload.dates,
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
        error: payload.message,
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
