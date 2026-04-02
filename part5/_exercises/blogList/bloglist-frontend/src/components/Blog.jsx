import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {

  const [detailsShown, setDetailsShown] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const details = () => (
    <div>
      <p id='blog-url'>{blog.url}</p>
      <p id='blog-likes'>likes {blog.likes} <button onClick={addLike}>like</button></p>
      {blog.user && <p>{blog.user.name}</p>}
      <button onClick={removeBlog}>remove</button>
    </div>
  )

  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setDetailsShown(!detailsShown)}>{detailsShown? 'hide': 'view'}</button>
      {detailsShown && details()}
    </div>
  )
}

export default Blog