const assert = require('node:assert')
const bcrypt = require('bcrypt')
const { test, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const test_helper_users = require('./test_helper_users')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test('get all users as json', async () => {
  const users = await api.get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const userJson =	users.body
  console.log('all users', userJson)
  assert.strictEqual(userJson.length, 1) //root user
})


test('create new user', async () => {

  const newUser = {
    username: 'newUser',
    name: 'newUser',
    password: 'newUserPassword'
  }
  await api.post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const result = await test_helper_users.getAllInDb()
  const users = result.map(user => user.username)
  assert(users.includes(newUser.username))
})

test('username has less than 3 characters results in bad request (400)', async () => {
  const usersAtStart = await test_helper_users.getAllInDb()
  const newUser = {
    username: 'nw',
    name: 'newUser',
    password: 'newUserPassword'
  }

  const result = await api.post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  console.log(result.body.error)
  const usersAtEnd = await test_helper_users.getAllInDb()

  assert.strictEqual(usersAtStart.length, usersAtEnd.length)
})

test('password has less than 3 characters results in bad request (400)', async () => {
  const usersAtStart = await test_helper_users.getAllInDb()
  const newUser = {
    username: 'newUserWithInvalidPassword',
    name: 'newUserWithInvalidPassword',
    password: 'pw'
  }

  const result = await api.post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  console.log(result.body.error)
  const usersAtEnd = await test_helper_users.getAllInDb()

  assert.strictEqual(usersAtStart.length, usersAtEnd.length)
})

after(async () => {
  await mongoose.connection.close()
})