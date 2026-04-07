// import { useState } from 'react'

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

  return(
    <>
      <h2>{blog.author}: {blog.title}</h2>
      <a href={blog.url} id='blog-url'>{blog.url}</a>
      <p id='blog-likes'>
        likes {blog.likes}
        {isLoggedIn && <button onClick={addLike}>like</button>}
      </p>
      {blog.user && <p>Added by {blog.user.name}</p>}
      {canRemove && <button onClick={removeBlog}>remove</button>}
    </>
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