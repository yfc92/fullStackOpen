import { create } from 'zustand'
import blogService from '../services/blogs'
import loginService from '../services/login'
import persistentUser from '../services/persistentUser'


const useUserStore = create((set) => ({
  user: null,
  actions: {
    initialize: () => {
      const user = persistentUser.getUser()
      if (user) {
        blogService.setAuthToken(user.token)
        set(state => ({ user: user }))
      }
    },
    login: async (username, password) => {
      const user = await loginService.login({ username, password })
      console.log('logged in user', user)
      persistentUser.saveUser(user)
      blogService.setAuthToken(user.token)
      set(state => ({ user: user }))
    },
    logout: () => {
      persistentUser.removeUser()
      blogService.setAuthToken(null)
      set(state => ({ user: null }))
    }
  }
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)