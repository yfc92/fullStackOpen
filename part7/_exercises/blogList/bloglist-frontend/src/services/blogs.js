import axios from 'axios'
const baseUrl = '/api/blogs'

let authToken = null

const setAuthToken = (token) => (authToken = `Bearer ${token}`)

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

///requires valid auth token set
const createNew = async (newBlog) => {
  const config = {
    headers: { Authorization: authToken },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

const remove = async (blogID) => {
  const config = {
    headers: { Authorization: authToken },
  }
  const response = await axios.delete(`${baseUrl}/${blogID}`, config)
  return response.data
}

const addComment = async ({ blog, comment }) => {
  const response = await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    { content:comment })

  //TODO: uncomment if authorization is required
  // const config = {
  //   headers: { Authorization: authToken },
  // }

  // const response = await axios.post(`${baseUrl}/${blog.id}/comments`,
  //   { content:comment },
  //   config)
  return response.data
}

export default {
  getAll,
  createNew,
  setAuthToken,
  update,
  remove,
  addComment
}
