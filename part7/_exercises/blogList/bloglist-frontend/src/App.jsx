import { useEffect } from 'react'
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import Login from './components/Login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import BlogList from './components/BlogList'
import { useBlog, useNotification, useLocalUser, useUsers } from './hooks'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'

const ErrorFallback = ({ error }) => {
  console.log('Error callback called')
  return (
    <div role='alert'>
      <p>Something went wrong</p>
      <pre style={{ color: 'red' }}>{error?.message}</pre>
    </div>
  )
}

const InvalidPage = () => {
  return (
    <div role='alert'>
      <h1>404 - Page Note Found</h1>
    </div>
  )
}

const App = () => {
  const { message:notificationMessage, notify } = useNotification()
  //console.log('Notification message', notificationMessage)
  const navigate = useNavigate()

  const {
    blogs,
    createBlog,
    deleteBlog,
    addLike,
    initialize: initializeBlogs,
    addComment
  } = useBlog()

  const {
    user,
    initialize: initializeUser,
    login,
    logout,
  } = useLocalUser()

  const { users } = useUsers()

  const blogMatch = useMatch('/blogs/:id')
  const idMatchedBlog = blogMatch && blogs
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  //console.log('Matched blog', idMatchedBlog, 'blog count', blogs?.length)

  const userMatch = useMatch('/users/:id')
  const idMatchedUser = userMatch && users
    ? users.find(user => user.id === userMatch.params.id)
    : null
  //console.log('Matched user', idMatchedUser, 'user count', users?.length)

  useEffect(() => {
    initializeUser()
    initializeBlogs()
  }, [])

  const handleLogin = async (username, password) => {
    try {
      await login(username, password)
      navigate('/')
    } catch (error) {
      console.log('Error while logging in', error)
      notify({
        content: 'Wrong username or password',
        isError: true,
      })
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleCreate = async (blogData) => {
    try {
      const newBlog = await createBlog(blogData)
      // console.log('new blog created', newBlog)
      navigate('/')
      notify({
        content: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        isError: false,
      })
    } catch (error) {
      console.log('Error while creating new blog', error)
      notify({
        content: 'Failed to create new blog',
        isError: true,
      })
    }
  }

  const removeBlog = async (blog) => {
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    )
    if (confirmed) {
      await deleteBlog(blog.id)
      navigate('/')
      notify({
        content: `Blog ${blog.title} by ${blog.author} has been deleted`,
        isError: false,
      })
    }
  }

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color='inherit' onClick={() => navigate('/')}>
            blogs
          </Button>
          <Button color='inherit' onClick={() => navigate('/users')}>
            users
          </Button>
          {!user && (
            <Button color='inherit' onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
          {user && (
            <Button color='inherit' onClick={() => navigate('/create')}>
              new blog
            </Button>
          )}
          {user && (
            <Button color='inherit' onClick={handleLogout}>
              log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Notification message={notificationMessage} />
      <Routes>
        <Route path='/login' element={<Login handleLogin={handleLogin} />} />
        <Route
          path='/'
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <BlogList blogs={blogs} title='Blogs' />
            </ErrorBoundary>
          }
        />
        <Route
          path='/blogs/:id'
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Blog
                key={idMatchedBlog?.id}
                blog={idMatchedBlog}
                user={user}
                addLike={() => addLike(idMatchedBlog)}
                removeBlog={() => removeBlog(idMatchedBlog)}
                addComment={addComment}
              />
            </ErrorBoundary>
          }
        />
        <Route
          path='/create'
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <CreateBlogForm createBlog={handleCreate} />
            </ErrorBoundary>
          }
        />
        <Route
          path='/users'
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <UserList users={users} />
            </ErrorBoundary>
          }
        />
        <Route
          path='/users/:id'
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <UserInfo user={idMatchedUser} />
            </ErrorBoundary>
          }
        />
        <Route path='*' element={<InvalidPage />} />
      </Routes>
    </Container>
  )
}

export default App
