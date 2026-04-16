import blogService from '../services/blogs'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const queryKey = 'blogs'
//needs to be a variable to ensure that the initialize function argument never changes its value
const defaultInit = () => {}

const useBlogs = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (data) => {
      console.log('Query blogs successful', data)
    }
  })

  //console.log('Result data', result?.data)

  const newBlogMutation = useMutation({
    mutationFn: blogService.createNew,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData([queryKey])
      const newBlogs = blogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b,
      )
      queryClient.setQueryData([queryKey], newBlogs)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
    },
  })

  return {
    blogs: result.data,
    createBlog: (blog) => newBlogMutation.mutateAsync(blog),
    addLike: (blog) =>
      updateBlogMutation.mutateAsync({ ...blog, likes: blog.likes + 1, user: blog.user?.id }),
    deleteBlog: (id) => deleteBlogMutation.mutateAsync(id),
    initialize: defaultInit
  }
}

export default useBlogs
