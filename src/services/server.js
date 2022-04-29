import axios from 'axios'

const conf = {
  baseURL: 'http://localhost:8083',
}

const server = axios.create(conf)
const serverWithAuth = axios.create(conf)

serverWithAuth.interceptors.request.use(addAuthToken)

function addAuthToken(request) {
  let accessToken = localStorage.getItem('auth__token')

  if (!accessToken !== null) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }

  return request
}

export { server, serverWithAuth }
