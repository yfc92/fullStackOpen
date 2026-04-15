import { useState } from 'react'
import { useNotification as useNotificationZustand,
  useNotificationActions } from '../zustand/notificationStore'
import { useBlogs, useBlogActions } from '../zustand/blogStore'
import { useUser as useUserZustand, useUserActions } from '../zustand/userStore'

const apiType = 'zustand'
//const apiType = 'query-context'

export const useNotification = () => {
  const message_zustand = useNotificationZustand()
  const { notify:notify_zustand } = useNotificationActions()

  return(
    {
      message: message_zustand,
      notify: notify_zustand,
    }
  )
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}


export const useBlog = () => {
  const blogs = useBlogs()
  const {
    createBlog: createBlog_zustand,
    getAll: getAll_zustand,
    deleteBlog: deleteBlog_zustand,
    initialize: initialize_zustand,
    addLike: addLike_zustand
  } = useBlogActions()
  return({
    blogs,
    createBlog: createBlog_zustand,
    getAll: getAll_zustand,
    deleteBlog: deleteBlog_zustand,
    initialize: initialize_zustand,
    addLike: addLike_zustand
  })
}

export const useUser = () => {
  const user = useUserZustand()
  const {
    initialize: initialize_zustand,
    login: login_zustand,
    logout: logout_zustand
  } = useUserActions()
  return({
    user,
    initialize: initialize_zustand,
    login: login_zustand,
    logout: logout_zustand
  })
}