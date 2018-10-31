import {
  SIGN_IN_FULFILLED,
  SIGN_IN_PENDING,
  SIGN_IN_REJECTED,
  SIGN_UP_FULFILLED,
  SIGN_UP_PENDING,
  SIGN_UP_REJECTED, VERIFY_EMAIL_FULFILLED, VERIFY_EMAIL_PENDING, VERIFY_EMAIL_REJECTED,
} from '../actions/auth.action'

const initialState = {
  loading: false,
  user: null,
  errorLogin: null,
  errorRegister: null,
  errorVerify: null,
  verificationCode: '',
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
    // SIGN UP
    case SIGN_UP_PENDING:
      return {
        ...state,
        loading: true,
      }

    case SIGN_UP_REJECTED:
      return {
        ...state,
        errorRegister: null,
        loading: false,
      }

    case SIGN_UP_FULFILLED: {
      return {
        ...state,
        verificationCode: payload,
        errorRegister: null,
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
        errorVerify: payload,
        loading: false,
      }

    case VERIFY_EMAIL_FULFILLED: {
      return {
        ...state,
        user: payload,
        errorVerify: null,
        loading: false,
      }
    }

    default:
      return state
  }
}

export default auth
