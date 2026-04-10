import { create } from 'zustand'

const useNotificationStore = create((set, get) => ({
  message: '',
  timeoutId: null,
  actions: {
    update: (newMessage) => {
      const timeoutId = get().timeoutId
      if(timeoutId)
        clearTimeout(timeoutId)
      const newTimeoutId = setTimeout(() => {
        set(state => ({ message: '' }))
      }, 5000)
      set(state => ({
        message: newMessage,
        timeoutId: newTimeoutId
      }))
    }
  }
}))

export const useNotification = () => useNotificationStore((state) => state.message)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)