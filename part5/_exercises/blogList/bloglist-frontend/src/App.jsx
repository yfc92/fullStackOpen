import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const user_localStorageKey = 'user'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [systemMessage, setSystemMessage] = useState(null)
  
  const notify = (newMessage) => {
    setSystemMessage(newMessage)
        setTimeout(() => {
          setSystemMessage(null)
        }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem(user_localStorageKey)
    if(userJSON){
      const user = JSON.parse(userJSON)
      blogService.setAuthToken(user.token)
      setUser(user)
    }
  }, [])
  

  const handleLogin = async (event) =>{
    event.preventDefault()

    try{
      const user = await loginService.login({username, password})
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

  const loginForm = () =>{
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
                  onChange={({target}) => setUsername(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                password
                <input
                  type='password'
                  value={password}
                  onChange={({target}) => setPassword(target.value)}
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

  const handleLogout = () =>{
    setUser(null)
    window.localStorage.removeItem(user_localStorageKey)
    blogService.setAuthToken(null)
  }

  const loggedInPage = () =>{
    return(
      <div>
          <p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
      </div>
    )
  }


  const handleCreate = async (event) =>{
    event.preventDefault()
    try{
      const newBlog = await blogService.createNew({title, author, url}) 
      setTitle('')
      setAuthor('')
      setUrl('')
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

  const createNewTab = () =>{
    return(
      <form onSubmit={handleCreate}>
        <div>
          <h2>create new</h2>
          <div>
            <label>
              title:
              <input
                type='text'
                value={title}
                onChange={({target}) => setTitle(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              author:
              <input
                type='text'
                value={author}
                onChange={({target}) => setAuthor(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              url:
              <input
                type='text'
                value={url}
                onChange={({target}) => setUrl(target.value)}
              />
            </label>
          </div>
        </div>
        <button type='submit'>create</button>
      </form>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={systemMessage} />
      {loggedInPage()}
      {createNewTab()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App