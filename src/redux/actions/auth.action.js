import * as API from '../../api/auth'
import { LOGOUT, SIGN_IN, SIGN_UP, VERIFY_EMAIL } from './index'

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
