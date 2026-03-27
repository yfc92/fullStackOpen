const assert = require('node:assert')
const { test, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testHelper = require('./test_helper')
const Blog = require('../models/blog')
const { nonExistingId } = require('../../../backend/tests/test_helper')

beforeEach(async () => {
  //delete all existing
  await Blog.deleteMany({})
  //insert test data
  await Blog.insertMany(testHelper.testBlogs)
})


test('get all blogs and get correct count', async () => {
  const blogs = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  console.log('blog content', blogs.body)
  assert.strictEqual(blogs.body.length, testHelper.testBlogs.length)
})

test('check that blog object has a property named id', async () => {
  const blogs = await testHelper.getAllInDb()
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
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  //check if total blogs is increased by 1
  const blogs = await testHelper.getAllInDb()
  assert.strictEqual(blogs.length, testHelper.testBlogs.length + 1)
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

  await api.post('/api/blogs')
    .send(newBlogWithMissingTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogs = await testHelper.getAllInDb()
  assert.strictEqual(blogs.length, testHelper.testBlogs.length)
})

test('bad request when create blog with missing url', async () => {
  const newBlogWithMissingUrl = {
    title: 'Test Title',
    author: 'Test Author',
    likes: 0,
  }

  await api.post('/api/blogs')
    .send(newBlogWithMissingUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogs = await testHelper.getAllInDb()
  assert.strictEqual(blogs.length, testHelper.testBlogs.length)
})


test('delete object with existing id', async () => {
  const blogsAtStart = await testHelper.getAllInDb()
  const targetBlog = blogsAtStart[0]

  await api.delete(`/api/blogs/${targetBlog.id}`)
    .expect(204)

  const blogsAtEnd = await testHelper.getAllInDb()
  const ids = blogsAtEnd.map(n => n.id)
  assert(!ids.includes(targetBlog.id))
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('delete object with non-existing id', async () => {
  const blogsAtStart = await testHelper.getAllInDb()
  const nonExistingID = await testHelper.nonExistingId()
  console.log('non-existing id:', nonExistingID)
  await api.delete(`/api/blogs/${nonExistingID}`)
    .expect(204)

  const blogsAtEnd = await testHelper.getAllInDb()
  const ids = blogsAtEnd.map(n => n.id)
  assert(!ids.includes(nonExistingID))
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('updating object with existing id', async () => {
  const blogsAtStart = await testHelper.getAllInDb()
  const firstBlog = blogsAtStart[0]
  const initLikeCount = firstBlog.likes
  firstBlog.likes = initLikeCount + 1

  const updatedBlog = await api.put(`/api/blogs/${firstBlog.id}`)
    .send(firstBlog)
    .expect(200)

  const blogsAtEnd = await testHelper.getAllInDb()
  assert.notStrictEqual(initLikeCount, updatedBlog.likes)
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})

test('updating existing object with invalid body returns 400 (Bad Request)', async () => {
  const blogsAtStart = await testHelper.getAllInDb()
  const firstBlog = blogsAtStart[0]
  const initLikeCount = firstBlog.likes
  firstBlog.likes = initLikeCount + 1

  const updatedBlog = await api.put(`/api/blogs/${firstBlog.id}`)
    .expect(400)

  const blogsAtEnd = await testHelper.getAllInDb()
  assert.notStrictEqual(initLikeCount, updatedBlog.likes)
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})


test('updating object with non-existing id returns 404 (Not Found)', async () => {
  const blogsAtStart = await testHelper.getAllInDb()
  const firstBlog = blogsAtStart[0]
  const nonExistingBlogID = await testHelper.nonExistingId()

  await api.put(`/api/blogs/${nonExistingBlogID}`)
    .send(firstBlog)
    .expect(404)

  const blogsAtEnd = await testHelper.getAllInDb()
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})

after(async () => {
  await mongoose.connection.close()
})