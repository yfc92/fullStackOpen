const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  // const blogs = await Blog.find({}).populate('users', { username:1, name:1, id:1 })
  const blogs = await Blog.find({}).populate('user', { username:1, name:1, id:1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const { title, author, url, likes } = request.body

  const user = request.user
  if(!user || !user.id){
    return response.status(401).json({ 'error': 'token invalid' })
  }

  const dbUser = await User.findById(user.id)
  if(!dbUser){
    console.log('No existing user found to associate with new blog')
    return response.status(404).json({ error: 'No existing user found to associate with new blog' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: dbUser.id
  })


  const savedBlog = await blog.save()

  dbUser.blogs = dbUser.blogs.concat(blog._id)
  await dbUser.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  if(!request.token){
    return response.status(401).json({ 'error': 'Unauthorized. Missing Token' })
  }

  const blog = await Blog.findById(request.params.id)

  if(!blog){
    return response.status(204).end()
  }

  const user = request.user
  if(!user || !user.id){
    return response.status(401).json({ 'error': 'Token cannot be verified' })
  }

  if(!blog.user)
  {
    return response.status(400).json({ 'error':'Blog is missing user info' })
  }

  const blogUserID = blog.user.toString()
  //console.log('blog user id:', blogUserID, 'decoded token:',decodedToken)
  if( blogUserID === user.id ){
    await blog.deleteOne()
    response.status(204).end()
  }
  else{
    return response.status(401).json({ 'error': 'Unauthorized. Token user does not match blog user' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  if(!request.body){
    return response.status(400).end()
  }
  const { title, url, likes, author, user } = request.body
  const blog = await Blog.findById(request.params.id)
  if(!blog){
    return response.status(404).end()
  }
  Object.assign(blog, { title, url, likes, author, user })
  await blog.save()
  await blog.populate('user', { username:1, name:1, id:1 })
  response.json(blog)
})

module.exports = blogsRouter