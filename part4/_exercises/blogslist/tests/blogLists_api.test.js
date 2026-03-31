//Need to ensure that users_api.test.js doesn't run alongside this test script
//user commands like: npm test --test-concurrency=1
//or npm test -- test/blogLists_api.test.js
const assert = require('node:assert')
const { test, before, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testHelper_blogs = require('./test_helper_blogs')
const Blog = require('../models/blog')
const User = require('../models/user')
const testHelper_user = require('./test_helper_users')

const getUserAuthTokenString = async () => {
  const { username, password } = testHelper_user.testUser
  console.log('login credentials', username, password)
  const response = await api.post('/api/login')
    .send({ username, password })
    .expect(200)
  console.log('Received response:', response.body)
  return `Bearer ${response.body.token}`
}

let userAuthTokenString = null

before(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(testHelper_user.testUser).expect(201)
  userAuthTokenString = await getUserAuthTokenString()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testHelper_blogs.testBlogs)
})


test('get all blogs and get correct count', async () => {
  const blogs = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  console.log('blog content', blogs.body)
  assert.strictEqual(blogs.body.length, testHelper_blogs.testBlogs.length)
})

test('check that blog object has a property named id', async () => {
  const blogs = await testHelper_blogs.getAllInDb()
  const firstBlog = blogs[0]
  console.log('first blog returned', firstBlog)
  assert(Object.keys(firstBlog).includes('id'))
})

test('create a new blog post', async () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://google.com',
    likes: 0,
  }
  console.log('Auth token', userAuthTokenString)
  await api.post('/api/blogs')
    .set('Authorization', userAuthTokenString)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  //check if total blogs is increased by 1
  const blogs = await testHelper_blogs.getAllInDb()
  assert.strictEqual(blogs.length, testHelper_blogs.testBlogs.length + 1)
  assert(blogs.some(blog => blog.title === 'Test Title'))
  //check if blog post is saved in database
})

test('likes is default to 0 in a blog post', () => {
  const testBlog = new Blog({
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://google.com',
  })
  console.log('test blog', testBlog)
  assert.strictEqual(testBlog.likes, 0)
})


test('bad request when create blog with missing title', async () => {
  const newBlogWithMissingTitle = {
    author: 'Test Author',
    url: 'http://google.com',
    likes: 0,
  }
  console.log('Auth token', userAuthTokenString)

  await api.post('/api/blogs')
    .set('Authorization', userAuthTokenString)
    .send(newBlogWithMissingTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogs = await testHelper_blogs.getAllInDb()
  assert.strictEqual(blogs.length, testHelper_blogs.testBlogs.length)
})

test('bad request when create blog with missing url', async () => {
  const newBlogWithMissingUrl = {
    title: 'Test Title',
    author: 'Test Author',
    likes: 0,
  }

  await api.post('/api/blogs')
    .set('Authorization', userAuthTokenString)
    .send(newBlogWithMissingUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogs = await testHelper_blogs.getAllInDb()
  assert.strictEqual(blogs.length, testHelper_blogs.testBlogs.length)
})


test('delete object with existing id', async () => {
  const blogsAtStart = await testHelper_blogs.getAllInDb()

  ///create a temporary blog, then delete it
  const blogData = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://google.com',
    likes: 0,
  }
  console.log('Auth token', userAuthTokenString)
  const createResponse = await api.post('/api/blogs')
    .set('Authorization', userAuthTokenString)
    .send(blogData)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  console.log('Created blog:', createResponse.body)
  const blogID = createResponse.body.id

  await api.delete(`/api/blogs/${blogID}`)
    .set('Authorization', userAuthTokenString)
    .expect(204)

  const blogsAtEnd = await testHelper_blogs.getAllInDb()
  const ids = blogsAtEnd.map(n => n.id)
  assert(!ids.includes(blogID))
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('delete object with non-existing id', async () => {
  const blogsAtStart = await testHelper_blogs.getAllInDb()
  const nonExistingID = await testHelper_blogs.nonExistingId()
  console.log('non-existing id:', nonExistingID)
  await api.delete(`/api/blogs/${nonExistingID}`)
    .set('Authorization', userAuthTokenString)
    .expect(204)

  const blogsAtEnd = await testHelper_blogs.getAllInDb()
  const ids = blogsAtEnd.map(n => n.id)
  assert(!ids.includes(nonExistingID))
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('updating object with existing id', async () => {
  const blogsAtStart = await testHelper_blogs.getAllInDb()
  const firstBlog = blogsAtStart[0]
  const initLikeCount = firstBlog.likes
  firstBlog.likes = initLikeCount + 1

  const updatedBlog = await api.put(`/api/blogs/${firstBlog.id}`)
    .send(firstBlog)
    .expect(200)

  const blogsAtEnd = await testHelper_blogs.getAllInDb()
  assert.notStrictEqual(initLikeCount, updatedBlog.likes)
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})

test('updating existing object with invalid body returns 400 (Bad Request)', async () => {
  const blogsAtStart = await testHelper_blogs.getAllInDb()
  const firstBlog = blogsAtStart[0]
  const initLikeCount = firstBlog.likes
  firstBlog.likes = initLikeCount + 1

  const updatedBlog = await api.put(`/api/blogs/${firstBlog.id}`)
    .expect(400)

  const blogsAtEnd = await testHelper_blogs.getAllInDb()
  assert.notStrictEqual(initLikeCount, updatedBlog.likes)
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})


test('updating object with non-existing id returns 404 (Not Found)', async () => {
  const blogsAtStart = await testHelper_blogs.getAllInDb()
  const firstBlog = blogsAtStart[0]
  const nonExistingBlogID = await testHelper_blogs.nonExistingId()

  await api.put(`/api/blogs/${nonExistingBlogID}`)
    .send(firstBlog)
    .expect(404)

  const blogsAtEnd = await testHelper_blogs.getAllInDb()
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})

after(async () => {
  await mongoose.connection.close()
})