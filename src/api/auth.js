import { error, post } from './index'

export const signIn = async user => {
  const [err, res] = await post('/signin/', user)

  if (err) throw error(err)
  if (!res.data.success) throw res.data.message

  return {
    email: user.email,
    token: res.data.token,
  }
}

export const signUp = async user => {
  const [err, res] = await post('/signup/', user)

  if (err) throw error(err)
  if (!res.data.success) throw res.data.message

  return {
    email: user.email,
    verificationCode: res.data.verificationCode,
  }
}

export const verifyEmail = async data => {
  const [err, res] = await post('/verify-email/', data)

  if (err) throw error(err)
  if (!res.data.success) throw res.data.message

  return {
    email: data.email,
    token: res.data.token,
  }
}
