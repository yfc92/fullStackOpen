import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import {
  Routes, Route, Link,
  useNavigate, useMatch } from 'react-router-dom'
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button } from '@mui/material'
import Login from './components/Login'

const user_localStorageKey = 'user'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [systemMessage, setSystemMessage] = useState(null)
  // const blogFormToggleRef = useRef()

  const navigate = useNavigate()

  const blogMatch = useMatch('/blogs/:id')
  const idMatchedBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

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
    const userJSON = window.localStorage.getItem(user_localStorageKey)
    if(userJSON){
      const user = JSON.parse(userJSON)
      blogService.setAuthToken(user.token)
      setUser(user)
    }
    refreshBlogList()
  }, [])


  const handleLogin = async (username, password) => {

    try{
      const user = await loginService.login({ username, password })
      console.log('logged in user', user)
      window.localStorage.setItem(user_localStorageKey, JSON.stringify(user))
      blogService.setAuthToken(user.token)
      setUser(user)
      navigate('/')
    } catch (error){
      console.log('Error while logging in', error)
      notify({
        content: 'Wrong username or password',
        isError: true
      })
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem(user_localStorageKey)
    blogService.setAuthToken(null)
    navigate('/')
  }

  // const loggedInPage = () => {
  //   return(
  //     <div>
  //       <p>{user.name} logged in<button onClick={handleLogout}>log out</button></p>
  //     </div>
  //   )
  // }


  const handleCreate = async (blogData) => {
    try{
      // blogFormToggleRef.current.toggleVisibility()
      const newBlog = await blogService.createNew(blogData)
      console.log('new blog created', newBlog)
      refreshBlogList()
      navigate('/')
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

  // const createNewBlog = () => (
  //   <Togglable buttonLabel='create new blog' ref={blogFormToggleRef}>
  //     <CreateBlogForm createBlog={handleCreate} />
  //   </Togglable>
  // )

  const handleAddLike = async (blog) => {
    ///only send user's id string in request data
    const toSend = { ...blog, likes: blog.likes+1, user: blog.user?.id }
    console.log('handle add like, data before sending', toSend)
    const updatedBlog = await blogService.update(toSend)
    // console.log('Updated blog:', updatedBlog)
    setBlogs(blogs.map((tBlog) => {
      if(tBlog.id === updatedBlog.id) return updatedBlog
      else return tBlog
    }))
  }

  const removeBlog = async (blog) => {
    const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if(confirmed){
      await blogService.remove(blog.id)
      refreshBlogList()
      navigate('/')
      notify({
        content: `Blog ${blog.title} by ${blog.author} has been deleted`,
        isError: false
      })
    }
  }

  // <div>
  //     <h2>blogs</h2>
  //     <Notification message={systemMessage} />
  //     {loggedInPage()}
  //     {createNewBlog()}
  //     {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
  //       <Blog key={blog.id}
  //         blog={blog}
  //         addLike={() => handleAddLike(blog)}
  //         canRemove={checkRemovable(blog)}
  //         removeBlog={() => removeBlog(blog)} />
  //     )}
  //   </div>


  const blogList = () => {
    return(
      <div>
        <h2>blogs</h2>
        <ul>
          {blogs.sort((a,b) => b.likes - a.likes)
            .map(blog => {
              return(
                <li key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )}

  // const padding = {
  //   padding: 5
  // }

  //       <div>
  //       <Link style={padding} to='/'>blogs</Link>
  //       {!user && <Link style={padding} to='/login'>login</Link>}
  //       {user && <Link style={padding} to='/create'>new blog</Link>}
  //       {user && <button onClick={handleLogout}>log out</button>}
  //     </div>
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>blogs</Button>
          {!user && <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>}
          {user && <Button color="inherit" onClick={() => navigate('/create')}>new blog</Button>}
          {user && <Button color="inherit" onClick={handleLogout}>log out</Button>}
        </Toolbar>
      </AppBar>
      <Notification message={systemMessage} />
      <Routes>
        <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>
        <Route path='/' element={blogList()}/>
        <Route path='/blogs/:id'
          element={<Blog key={idMatchedBlog?.id}
            blog={idMatchedBlog}
            user={user}
            addLike={() => handleAddLike(idMatchedBlog)}
            removeBlog={() => removeBlog(idMatchedBlog)} />
          }/>
        <Route path='/create' element={<CreateBlogForm createBlog={handleCreate} />}/>
      </Routes>
    </Container>
  )
}

export default App