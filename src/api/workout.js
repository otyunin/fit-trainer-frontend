import { error, post, get, put } from './index'

const config = () => ({
  headers: { Authorization: localStorage.getItem('JWT_TOKEN') },
})

export const createWorkout = async data => {
  const [err, res] = await post('/workout/', data, config)

  if (err) throw error(err)
  if (!res.data.success) throw res.data.message

  return {
    success: data.success,
  }
}

export const getWorkout = async () => {
  const [err, res] = await get('/workout/', config)

  if (err) throw error(err)
  if (!res.data.success) throw res.data.message
  return {
    workout: res.data.workout,
  }
}

export const updateWorkout = async data => {
  const [err, res] = await put('/workout/', data, config)

  if (err) throw error(err)

  return {
    workout: res.data.workout,
  }
}
