import {
  Button,
  Stack,
  Typography,
  Box,
  Paper,
  Link,
} from '@mui/material'

const Blog = ({ blog, user, addLike, removeBlog }) => {
  if (!blog) {
    return null
  }

  const isLoggedIn = !!user
  const checkRemovable = (user, blog) => {
    // console.log('check removable. user:', user, ' blog user:',blog.user)
    if (!user || !blog.user) return false
    return user.username === blog.user.username
  }
  const canRemove = checkRemovable(user, blog)

  return (
    <Box
      sx={{
        lineHeight: 2,
        mt: 1,
      }}
    >
      <Paper elevation={2} sx={{ p: 1 }}>
        <Typography variant='h6'>{blog.title}</Typography>
        <Typography variant='subtitle1'>by {blog.author}</Typography>
        <Link href={blog.url} id='blog-url'>
          {blog.url}
        </Link>
        {blog.user && (
          <Typography variant='body2' component='p'>
            Added by {blog.user.name}
          </Typography>
        )}
        <Stack
          direction='row'
          spacing={1}
          alignitems='center'
          sx={{ width: 'fit-content' }}
        >
          <Typography
            variant='body2'
            component='p'
            sx={{ fontWeight: 'bold', alignContent: 'center' }}
          >
            {blog.likes} likes
          </Typography>
          {isLoggedIn && (
            <Button variant='outlined' onClick={addLike}>
              like
            </Button>
          )}
          {canRemove && (
            <Button variant='outlined' color='error' onClick={removeBlog}>
              remove
            </Button>
          )}
        </Stack>
      </Paper>
    </Box>
  )
}

export default Blog
