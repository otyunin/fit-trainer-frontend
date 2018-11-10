import { error, post } from './index'

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
