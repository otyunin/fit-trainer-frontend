/* eslint-disable no-return-await */
import axios from 'axios'
import to from 'util-to'
import store from '../index'
import { logout } from '../redux/actions/auth.action'

export const API_URL = 'http://localhost:8080'

export const get = async (url, config = null) => await to(axios.get(API_URL + url, config))
export const post = async (url, data, config = null) => await to(axios.post(API_URL + url, data, config))

export const error = err => {
  if (err.response.status === 500) return 'INTERNAL SERVER ERROR'
  if (err.response.status === 404) return 'RESOURCE NOT FOUND'
  if (err.response.status === 403) {
    store.dispatch(logout())
    return 'TOKEN IS INVALID'
  }
  return err.response.data
}
