import { useState } from 'react'
import { TextField, Button, Stack } from '@mui/material'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createNewBlog}>
      <div>
        <h2>create new</h2>
        <Stack spacing={2} sx={{ width: '300px' }}>
          <TextField
            label='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            label='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            label='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Stack>
      </div>
      <Button type='submit' variant='contained' style={{ marginTop: 10 }}>
        create
      </Button>
    </form>
  )
}

export default CreateBlogForm
