import * as API from '../../api/auth'

const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_PENDING = 'SIGN_IN_PENDING'
export const SIGN_IN_REJECTED = 'SIGN_IN_REJECTED'
export const SIGN_IN_FULFILLED = 'SIGN_IN_FULFILLED'

const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_PENDING = 'SIGN_UP_PENDING'
export const SIGN_UP_REJECTED = 'SIGN_UP_REJECTED'
export const SIGN_UP_FULFILLED = 'SIGN_UP_FULFILLED'

const VERIFY_EMAIL = 'VERIFY_EMAIL'
export const VERIFY_EMAIL_PENDING = 'VERIFY_EMAIL_PENDING'
export const VERIFY_EMAIL_REJECTED = 'VERIFY_EMAIL_REJECTED'
export const VERIFY_EMAIL_FULFILLED = 'VERIFY_EMAIL_FULFILLED'

export const LOGOUT = 'LOGOUT'

export const signIn = user => async dispatch => {
  await dispatch({
    type: SIGN_IN,
    payload: API.signIn(user),
  })
}

export const signUp = user => async dispatch => {
  await dispatch({
    type: SIGN_UP,
    payload: API.signUp(user),
  })
}

export const verifyEmail = data => async dispatch => {
  await dispatch({
    type: VERIFY_EMAIL,
    payload: API.verifyEmail(data),
  })
}

export const logout = () => async dispatch => {
  localStorage.clear()
  await dispatch({
    type: LOGOUT,
  })
}
