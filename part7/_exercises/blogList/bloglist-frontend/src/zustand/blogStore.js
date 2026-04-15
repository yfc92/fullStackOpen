import { create } from 'zustand'
import blogService from '../services/blogs'

const useBlogStore = create((set, get) => ({
  blogs: [],
  actions:{
    initialize: async () => {
      const blogs = await blogService.getAll()
      set(state => ({ blogs: blogs }))
    },
    getAll: async () => {
      const blogs = await blogService.getAll()
      return blogs
    },
    createBlog: async (blog) => {
      const newBlog = await blogService.createNew(blog)
      const newBlogs = get().blogs.concat(newBlog)
      set(state => ({ blogs: newBlogs }))
      return newBlog
    },
    deleteBlog: async (blogID) => {
      await blogService.remove(blogID)
      const newBlogs = get().blogs.filter(b => b.id !== blogID)
      set(state => ({ blogs: newBlogs }))
    },
    addLike: async (blog) => {
      ///only send user's id string in request data
      const toSend = { ...blog, likes: blog.likes + 1, user: blog.user?.id }
      console.log('handle add like, data before sending', toSend)
      const updatedBlog = await blogService.update(toSend)
      const newBlogs = get().blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
      set(state => ({ blogs: newBlogs }))
      return updatedBlog
    }
  }
}))

export const useBlogs = () => useBlogStore(state => state.blogs)

export const useBlogActions = () => useBlogStore(state => state.actions)