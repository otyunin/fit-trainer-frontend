import { error, post, get, put } from './index'

const config = () => ({
  headers: { Authorization: localStorage.getItem('JWT_TOKEN') },
})

export const getWorkoutDates = async () => {
  const [err, res] = await get('/workout/dates', config)

  if (err) throw error(err)
  if (!res.data.success) throw res.data.message
  return {
    dates: res.data.dates,
  }
}

export const createWorkout = async (data, date) => {
  const [err, res] = await post(`/workout/${date}`, data, config)

  if (err) throw error(err)
  if (!res.data.success) throw res.data.message

  return {
    success: data.success,
  }
}

export const getWorkout = async (date) => {
  const [err, res] = await get(`/workout/${date}`, config)

  if (err) throw error(err)
  if (!res.data.success) throw res.data.message
  return {
    workout: res.data.workout,
  }
}

export const updateWorkout = async (data, date) => {
  const [err, res] = await put(`/workout/${date}`, data, config)

  if (err) throw error(err)

  return {
    workout: res.data.workout,
  }
}
