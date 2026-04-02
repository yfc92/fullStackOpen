import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const user_localStorageKey = 'user'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [systemMessage, setSystemMessage] = useState(null)
  const blogFormToggleRef = useRef()

  const refreshBlogList = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const notify = (newMessage) => {
    setSystemMessage(newMessage)
    setTimeout(() => {
      setSystemMessage(null)
    }, 5000)
  }

  useEffect(() => {
    refreshBlogList()
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem(user_localStorageKey)
    if(userJSON){
      const user = JSON.parse(userJSON)
      blogService.setAuthToken(user.token)
      setUser(user)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({ username, password })
      console.log('logged in user', user)
      window.localStorage.setItem(user_localStorageKey, JSON.stringify(user))
      blogService.setAuthToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error){
      console.log('Error while logging in', error)
      notify({
        content: 'Wrong username or password',
        isError: true
      })
    }
  }

  const loginForm = () => {
    return(
      <>
        <form onSubmit={handleLogin}>
          <div>
            <h2>Log in to application</h2>
            <Notification message={systemMessage} />
            <div>
              <label>
                username
                <input
                  type='text'
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                password
                <input
                  type='password'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </label>
            </div>
          </div>
          <button type='submit'>login</button>
        </form>
      </>
    )
  }

  if(user === null){
    return loginForm()
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem(user_localStorageKey)
    blogService.setAuthToken(null)
  }

  const loggedInPage = () => {
    return(
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
      </div>
    )
  }


  const handleCreate = async (blogData) => {
    try{
      blogFormToggleRef.current.toggleVisibility()
      const newBlog = await blogService.createNew(blogData)
      setBlogs(blogs.concat(newBlog))
      notify({
        content: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        isError: false
      })
    } catch (error) {
      console.log('Error while creating new blog', error)
      notify({
        content: 'Failed to create new blog',
        isError: true
      })
    }
  }

  const createNewBlog = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormToggleRef}>
      <BlogForm createBlog={handleCreate} />
    </Togglable>
  )

  const handleAddLike = async (blog) => {
    ///only send user's id string in request data
    const toSend = { ...blog, likes: blog.likes+1, user: blog.user?.id }
    // console.log('handle add like, data before sending', toSend)
    const updatedBlog = await blogService.update(toSend)
    // console.log('Updated blog:', updatedBlog)
    setBlogs(blogs.map((tBlog) => {
      if(tBlog.id === updatedBlog.id) return updatedBlog
      else return tBlog
    }))
  }

  const removeBlog = async (blog) => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    await blogService.remove(blog.id)
    refreshBlogList()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={systemMessage} />
      {loggedInPage()}
      {createNewBlog()}
      {blogs.sort((a,b) => a.likes - b.likes).map(blog =>
        <Blog key={blog.id} blog={blog} addLike={() => handleAddLike(blog)} removeBlog={() => removeBlog(blog)} />
      )}
    </div>
  )
}

export default App