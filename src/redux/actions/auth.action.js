import * as API from '../../api/auth'

const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_PENDING = 'SIGN_IN_PENDING'
export const SIGN_IN_REJECTED = 'SIGN_IN_REJECTED'
export const SIGN_IN_FULFILLED = 'SIGN_IN_FULFILLED'
const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_PENDING = 'SIGN_UP_PENDING'
export const SIGN_UP_REJECTED = 'SIGN_UP_REJECTED'
export const SIGN_UP_FULFILLED = 'SIGN_UP_FULFILLED'

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
