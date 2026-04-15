import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@mui/material'

const BlogList = ({ blogs }) => {
  if (!blogs) return null
  //throw new Error('Simulated bloglist error')
  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            return (
              <li key={blog.id}>
                <Link component={RouterLink} to={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default BlogList
