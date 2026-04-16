import { Typography } from '@mui/material'
import LinkedText from './LinkedText'
const BlogList = ({ blogs, title }) => {
  return (
    <div>
      <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 2 }}>{title}</Typography>
      <ul>
        {blogs && blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            return (
              <li key={blog.id}>
                <LinkedText
                  link={`/blogs/${blog.id}`}
                  text={`${blog.title} by ${blog.author}`} />
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default BlogList
