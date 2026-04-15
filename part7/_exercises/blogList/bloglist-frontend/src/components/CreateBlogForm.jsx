import { TextField, Button, Stack } from '@mui/material'
import { useField } from '../hooks'

const CreateBlogForm = ({ createBlog }) => {

  const { reset:resetTitle, ...title } = useField('text')
  const { reset:resetAuthor, ...author } = useField('text')
  const { reset:resetUrl, ...url } = useField('text')

  const createNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    createBlog(newBlog)
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <form onSubmit={createNewBlog}>
      <div>
        <h2>create new</h2>
        <Stack spacing={2} sx={{ width: '300px' }}>
          <TextField
            label='title'
            {...title}
          />
          <TextField
            label='author'
            {...author}
          />
          <TextField
            label='url'
            {...url}
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
