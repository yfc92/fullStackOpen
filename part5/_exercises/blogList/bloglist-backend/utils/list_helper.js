const _ = require('lodash')
const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (totalLikes, blog) => {
    // console.log('total likes:', totalLikes, blog)
    return totalLikes + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((currFav, blog) => {
    if(currFav === null) return blog
    return blog.likes > currFav.likes ? blog : currFav
  })
}

const mostBlogs = (blogs) => {
  // ///get all authors
  // ///for each author, find their number of blogs
  // ///return author with most blogs
  // console.log(`finding most blogs. blog count:${blogs?.length}`)
  // const authorBlogs = _.groupBy(blogs, 'author')
  // console.log('author blogs',authorBlogs)
  // const authorBlogsInPairs = _.toPairs(authorBlogs)
  // console.log('author blogs in pairs', authorBlogsInPairs)

  // const retVal = authorBlogsInPairs.reduce((previous, pair) => {
  //   const current = {
  //     author: pair[0],
  //     blogs: pair[1].length
  //   }
  //   console.log(`previous:${JSON.stringify(previous)}, current:${JSON.stringify(current)}`)
  //   if(!previous) return current
  //   return(
  //     current.blogs > previous.blogs
  //       ? current
  //       : previous)
  // },null)
  // console.log(retVal)
  // return retVal

  if (!blogs || blogs.length === 0) return null

  return _.chain(blogs)
    .groupBy('author')
    .map((authorBlogs, author) => ({
      author,
      blogs: authorBlogs.length
    }))
    .maxBy('blogs')
    .value()
}

const mostLikes = (blogs) => {
  ///get all authors
  ///for each author, find their number of blogs
  ///return author with most likes
  console.log(`finding most likes. blog count:${blogs?.length}`)
  // const authorBlogs = _.groupBy(blogs, 'author')
  // console.log('author blogs',authorBlogs)
  // const authorBlogsInPairs = _.toPairs(authorBlogs)
  // console.log('author blogs in pairs', authorBlogsInPairs)
  // const retVal = authorBlogsInPairs.reduce((previous, pair) => {
  //   const current = {
  //     author: pair[0],
  //     likes: totalLikes(pair[1])
  //   }
  //   console.log(`previous:${JSON.stringify(previous)}, current:${JSON.stringify(current)}`)
  //   if(!previous) return current
  //   return(
  //     current.likes > previous.likes
  //       ? current
  //       : previous)
  // },null)
  // console.log(retVal)
  // return retVal
  if (!blogs || blogs.length === 0) return null

  return _.chain(blogs)
    .groupBy('author')
    .map((authorBlogs, author) => ({
      author,
      likes: _.sumBy(authorBlogs, 'likes')
    }))
    .maxBy('likes')
    .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}