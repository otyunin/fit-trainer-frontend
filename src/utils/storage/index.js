const getUser = () => ({
  email: localStorage.getItem('EMAIL'),
  token: localStorage.getItem('JWT_TOKEN'),
})

export default getUser
