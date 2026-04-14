const User = require('../models/user')

const testUser = {
  'username': 'testUser1',
  'name': 'test user 1',
  'password': 'testUser1Password'
}

const getAllInDb = async () => {
  const blogs = await User.find({})
  return blogs.map(blog => blog.toJSON())
}

//TODO
const nonExistingId = async () => {
  const blog = new User({ url: 'willremovethissoon', title: 'tmp' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}
module.exports = {
  testUser,
  getAllInDb,
  nonExistingId
}