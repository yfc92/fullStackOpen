import axios from 'axios'
const baseUrl = '/api/blogs'

let authToken = null

const setAuthToken = (token) => authToken = `Bearer ${token}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

///requires valid auth token set
const createNew = async (newBlog) => {
  const config = {
    headers: { Authorization: authToken }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, createNew, setAuthToken }