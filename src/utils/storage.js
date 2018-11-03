import axios from 'axios'

export const getUser = () => ({
  email: localStorage.getItem('EMAIL'),
  token: localStorage.getItem('JWT_TOKEN'),
})

export const setUser = user => {
  localStorage.setItem('JWT_TOKEN', user.token)
  localStorage.setItem('EMAIL', user.email)
  axios.defaults.headers.common.Authorization = user.token
}
