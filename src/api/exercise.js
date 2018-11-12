import { del, error, get, post, put } from './index'

const config = () => ({
  headers: { Authorization: localStorage.getItem('JWT_TOKEN') },
})

export const createExercise = async data => {
  const [err, res] = await post('/exercises/', data, config)

  if (err) throw error(err)
  if (!res.data.success) throw res.data.message

  return {
    success: data.success,
  }
}

export const getExercises = async () => {
  const [err, res] = await get('/exercises/', config)

  if (err) throw error(err)

  return {
    exercises: res.data,
  }
}

export const updateExercises = async data => {
  const [err, res] = await put('/exercises/', data, config)

  if (err) throw error(err)

  return {
    exercises: res.data,
  }
}

export const deleteExercise = async id => {
  const [err] = await del(`/exercises/${id}`, config)

  if (err) throw error(err)
}
