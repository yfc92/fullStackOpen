// import { useState } from 'react'
import { TextField, Button, Stack, Typography, Box, Paper, Link } from '@mui/material'


const Blog = ({ blog, user, addLike, removeBlog }) => {

  if(!blog){
    return null
  }

  const isLoggedIn = !!user
  const checkRemovable = (user, blog) => {
    // console.log('check removable. user:', user, ' blog user:',blog.user)
    if(!user || !blog.user) return false
    return user.username === blog.user.username
  }
  const canRemove = checkRemovable(user, blog)

  // <h2>{blog.author}: {blog.title}</h2>
  //     <a href={blog.url} id='blog-url'>{blog.url}</a>
  //     <p id='blog-likes'>
  //       likes {blog.likes}
  //       {isLoggedIn && <button onClick={addLike}>like</button>}
  //     </p>
  //     {blog.user && <p>Added by {blog.user.name}</p>}
  //     {canRemove && <button onClick={removeBlog}>remove</button>}
  return(
    <Box
      sx={{
        lineHeight: 2,
        mt:1
      }}
    >
      <Paper elevation={2} sx={{ p: 1 }}>
        <Typography variant="h6" component="h6">
          {blog.title}
        </Typography>
        <Typography variant="string" component="div">
          by {blog.author}
        </Typography>
        <Link href={blog.url} id='blog-url'>{blog.url}</Link>
        {blog.user &&
          <Typography variant="string" component="div">
            Added by {blog.user.name}
          </Typography>}
        <Stack
          direction='row'
          spacing={1}
          alignitems='center'
          sx={{ width: 'fit-content' }}
        >
          <Typography variant="string" component="p" sx={{ fontWeight:'bold' }}>
            {blog.likes} likes
          </Typography>
          {isLoggedIn && <Button variant='outlined' onClick={addLike}>like</Button>}
          {canRemove && <Button variant='outlined' color='error' onClick={removeBlog}>remove</Button>}
        </Stack>
      </Paper>
    </Box>
  )

  // const [detailsShown, setDetailsShown] = useState(false)

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  // const details = () => (
  //   <div>
  //     <p id='blog-url'>{blog.url}</p>
  //     <p id='blog-likes'>
  //       likes {blog.likes}
  //       {isloggedIn && <button onClick={addLike}>like</button>}
  //     </p>
  //     {blog.user && <p>{blog.user.name}</p>}
  //     {canRemove && <button onClick={removeBlog}>remove</button>}
  //   </div>
  // )

  // return(
  //   <div style={blogStyle}>
  //     {blog.title} {blog.author} <button onClick={() => setDetailsShown(!detailsShown)}>{detailsShown? 'hide': 'view'}</button>
  //     {detailsShown && details()}
  //   </div>
  // )
}

export default Blog