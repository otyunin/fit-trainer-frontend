import { setUser } from 'utils/storage'

import {
  LOGOUT,
  SIGN_IN_FULFILLED,
  SIGN_IN_PENDING,
  SIGN_IN_REJECTED,
  SIGN_UP_FULFILLED,
  SIGN_UP_PENDING,
  SIGN_UP_REJECTED,
  VERIFY_EMAIL_FULFILLED,
  VERIFY_EMAIL_PENDING,
  VERIFY_EMAIL_REJECTED,
} from '../actions'

const initialState = {
  loading: false,
  user: null,
  error: null,
}

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    // SIGN IN
    case SIGN_IN_PENDING:
      return {
        ...state,
        loading: true,
      }

    case SIGN_IN_REJECTED:
      return {
        ...state,
        error: payload.message,
        loading: false,
      }

    case SIGN_IN_FULFILLED: {
      setUser(payload)
      return {
        ...state,
        user: payload,
        error: null,
        loading: false,
      }
    }
    // SIGN UP
    case SIGN_UP_PENDING:
      return {
        ...state,
        loading: true,
      }

    case SIGN_UP_REJECTED:
      return {
        ...state,
        error: payload.message,
        loading: false,
      }

    case SIGN_UP_FULFILLED: {
      return {
        ...state,
        error: null,
        loading: false,
      }
    }
    // VERIFY EMAIL
    case VERIFY_EMAIL_PENDING:
      return {
        ...state,
        loading: true,
      }

    case VERIFY_EMAIL_REJECTED:
      return {
        ...state,
        error: payload,
        loading: false,
      }

    case VERIFY_EMAIL_FULFILLED: {
      setUser(payload)
      return {
        ...state,
        user: payload,
        error: null,
        loading: false,
      }
    }

    case LOGOUT: {
      return {
        ...state,
        user: null,
      }
    }

    default:
      return state
  }
}

export default auth
