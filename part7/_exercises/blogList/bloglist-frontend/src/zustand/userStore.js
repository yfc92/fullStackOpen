import { create } from 'zustand'
import blogService from '../services/blogs'
import loginService from '../services/login'

const user_localStorageKey = 'user'

const useUserStore = create((set) => ({
  user: null,
  actions: {
    initialize: () => {
      const userJSON = window.localStorage.getItem(user_localStorageKey)
      if (userJSON) {
        const user = JSON.parse(userJSON)
        blogService.setAuthToken(user.token)
        set(state => ({ user: user }))
      }
    },
    login: async (username, password) => {
      const user = await loginService.login({ username, password })
      console.log('logged in user', user)
      window.localStorage.setItem(user_localStorageKey, JSON.stringify(user))
      blogService.setAuthToken(user.token)
      set(state => ({ user: user }))
    },
    logout: () => {
      window.localStorage.removeItem(user_localStorageKey)
      blogService.setAuthToken(null)
      set(state => ({ user: null }))
    }
  }
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)