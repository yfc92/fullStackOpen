import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const user_localStorageKey = 'user'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem(user_localStorageKey)
    if(userJSON){
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])
  

  const handleLogin = async (event) =>{
    event.preventDefault()

    try{
      const user = await loginService.login({username, password})
      console.log('logged in user', user)
      window.localStorage.setItem(user_localStorageKey, JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch{
      console.log('Wrong credentials')
    }
  }

  const loginForm = () =>{
    return(
      <>
        <form onSubmit={handleLogin}>
          <div>
            <h2>Log in to application</h2>
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

  const handleLogout = () =>{
    setUser(null)
    window.localStorage.removeItem(user_localStorageKey)
  }

  const loggedInPage = () =>{
    return(
      <div>
          <p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
      </div>
    )
  }

  if(user === null){
    return loginForm()
  }

  return (
    <div>
      <h2>blogs</h2>
      {loggedInPage()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App