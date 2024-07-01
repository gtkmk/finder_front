import axios from 'axios'

const api = axios.create({
  baseURL: `http://34.125.156.33:8089`,
})

api.interceptors.response.use(undefined, function onResponseError(error) {
  const { response } = error

  if (!response) throw error

  const { status } = response
  if (status === 401) {
    return window.location.replace(`/login`)
  }
})

export default api
