import {
  NEW_EXERCISE_PENDING,
  NEW_EXERCISE_REJECTED,
  NEW_EXERCISE_FULFILLED,
  GET_EXERCISES_PENDING,
  GET_EXERCISES_REJECTED,
  GET_EXERCISES_FULFILLED,
  UPDATE_EXERCISES_PENDING,
  UPDATE_EXERCISES_REJECTED,
  UPDATE_EXERCISES_FULFILLED, DELETE_EXERCISE_PENDING, DELETE_EXERCISE_REJECTED, DELETE_EXERCISE_FULFILLED,
} from '../actions'

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

    case GET_EXERCISES_PENDING:
      return {
        ...state,
        loading: true,
      }

    case GET_EXERCISES_REJECTED:
      return {
        ...state,
        error: payload,
        loading: false,
      }

    case GET_EXERCISES_FULFILLED: {
      return {
        ...state,
        exercises: payload.exercises,
        error: null,
        loading: false,
      }
    }

    case UPDATE_EXERCISES_PENDING:
      return {
        ...state,
        loading: true,
      }

    case UPDATE_EXERCISES_REJECTED:
      return {
        ...state,
        error: payload,
        loading: false,
      }

    case UPDATE_EXERCISES_FULFILLED: {
      return {
        ...state,
        error: null,
        loading: false,
      }
    }

    case DELETE_EXERCISE_PENDING:
      return {
        ...state,
        loading: true,
      }

    case DELETE_EXERCISE_REJECTED:
      return {
        ...state,
        error: payload.message,
        loading: false,
      }

    case DELETE_EXERCISE_FULFILLED: {
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
