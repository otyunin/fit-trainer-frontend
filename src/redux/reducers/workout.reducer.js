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
  DELETE_WORKOUT_PENDING,
  DELETE_WORKOUT_REJECTED,
  DELETE_WORKOUT_FULFILLED,
  DELETE_WORKOUT_EXERCISE_PENDING,
  DELETE_WORKOUT_EXERCISE_REJECTED,
  DELETE_WORKOUT_EXERCISE_FULFILLED,
} from '../actions'

const initialState = {
  loading: false,
  workout: null,
  dates: [],
  error: null,
  successCreate: false,
  successDelete: false,
}

const workout = (state = initialState, { type, payload }) => {
  switch (type) {
    // CREATE
    case NEW_WORKOUT_PENDING:
      return {
        ...state,
        successCreate: false,
        loading: true,
      }

    case NEW_WORKOUT_REJECTED:
      return {
        ...state,
        error: payload.message,
        successCreate: false,
        loading: false,
      }

    case NEW_WORKOUT_FULFILLED: {
      return {
        ...state,
        error: null,
        successCreate: true,
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
        workout: payload.workout,
        loading: false,
      }
    }
    // DELETE
    case DELETE_WORKOUT_PENDING:
      return {
        ...state,
        successDelete: false,
        loading: true,
      }

    case DELETE_WORKOUT_REJECTED:
      return {
        ...state,
        error: payload.message,
        successDelete: false,
        loading: false,
      }

    case DELETE_WORKOUT_FULFILLED: {
      return {
        ...state,
        error: null,
        successDelete: true,
        loading: false,
      }
    }
    // DELETE EXERCISE
    case DELETE_WORKOUT_EXERCISE_PENDING:
      return {
        ...state,
        successDelete: false,
        loading: true,
      }

    case DELETE_WORKOUT_EXERCISE_REJECTED:
      return {
        ...state,
        error: payload.message,
        loading: false,
      }

    case DELETE_WORKOUT_EXERCISE_FULFILLED: {
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
