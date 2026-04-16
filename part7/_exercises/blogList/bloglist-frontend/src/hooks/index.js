import { useState } from 'react'
import { useNotification as useNotificationZustand,
  useNotificationActions } from '../zustand/notificationStore'
import {
  useBlogs as useBlogs_zustand,
  useBlogActions as useBlogActions_zustand
} from '../zustand/blogStore'
import {
  useUser as useUser_zustand,
  useUserActions as useUserActions_zustand,
} from '../zustand/userStore'
import { useContext } from 'react'
import NotificationContext from '../query-context/NotificationContext'
import useBlogs_qc from '../query-context/useBlogs'
import UserContext from '../query-context/UserContext'

const apiType_zustand = 'zustand'
const apiType_query_context = 'query-context'

export const useNotification = () => {
  const apiType = apiType_query_context
  const message_zustand = useNotificationZustand()
  const { notify:notify_zustand } = useNotificationActions()

  const {
    message: message_qc,
    notify: notify_qc
  } = useContext(NotificationContext)


  if(apiType === apiType_zustand) {
    return { message: message_zustand, notify: notify_zustand }
  } else if(apiType === apiType_query_context){
    return { message: message_qc, notify: notify_qc }
  }

  throw new Error('Unknown api type')
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
  const apiType = apiType_query_context

  const blogs_zustand = useBlogs_zustand()
  const {
    createBlog: createBlog_zustand,
    deleteBlog: deleteBlog_zustand,
    initialize: initialize_zustand,
    addLike: addLike_zustand
  } = useBlogActions_zustand()

  const {
    blogs: blogs_qc,
    createBlog: createBlog_qc,
    deleteBlog: deleteBlog_qc,
    initialize: initialize_qc,
    addLike: addLike_qc
  } = useBlogs_qc()

  if(apiType === apiType_zustand)
  {
    return({
      blogs: blogs_zustand,
      createBlog: createBlog_zustand,
      deleteBlog: deleteBlog_zustand,
      initialize: initialize_zustand,
      addLike: addLike_zustand
    })
  } else if (apiType === apiType_query_context) {
    return({
      blogs: blogs_qc,
      createBlog: createBlog_qc,
      deleteBlog: deleteBlog_qc,
      initialize: initialize_qc,
      addLike: addLike_qc
    })
  }
  throw new Error('Unknown api type')
}

export const useUser = () => {
  const apiType = apiType_query_context

  const user_zustand = useUser_zustand()
  const {
    initialize: initialize_zustand,
    login: login_zustand,
    logout: logout_zustand
  } = useUserActions_zustand()

  const {
    user: user_qc,
    initialize: initialize_qc,
    login: login_qc,
    logout: logout_qc
  } =  useContext(UserContext)

  if(apiType === apiType_zustand)
  {
    return({
      user: user_zustand,
      initialize: initialize_zustand,
      login: login_zustand,
      logout: logout_zustand
    })
  } else if (apiType === apiType_query_context) {
    return({
      user: user_qc,
      initialize: initialize_qc,
      login: login_qc,
      logout: logout_qc
    })
  }

  throw new Error('Unknown api type')
}