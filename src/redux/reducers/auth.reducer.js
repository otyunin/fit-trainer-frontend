import {
  SIGN_IN_FULFILLED,
  SIGN_IN_PENDING,
  SIGN_IN_REJECTED,
  SIGN_UP_FULFILLED,
  SIGN_UP_PENDING,
  SIGN_UP_REJECTED,
} from '../actions/auth.action'

const initialState = {
  loading: false,
  user: null,
  errorLogin: null,
  errorRegister: null,
  verificationCode: '',
}

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN_PENDING:
      return {
        ...state,
        loading: true,
      }

    case SIGN_IN_REJECTED:
      return {
        ...state,
        errorLogin: payload,
        loading: false,
      }

    case SIGN_IN_FULFILLED: {
      return {
        ...state,
        user: payload,
        errorLogin: null,
        loading: false,
      }
    }

    case SIGN_UP_PENDING:
      return {
        ...state,
        errorRegister: payload,
        loading: false,
      }

    case SIGN_UP_REJECTED:
      return {
        ...state,
        loading: true,
      }

    case SIGN_UP_FULFILLED: {
      return {
        ...state,
        verificationCode: payload,
        errorRegister: null,
        loading: false,
      }
    }

    default:
      return state
  }
}

export default auth
