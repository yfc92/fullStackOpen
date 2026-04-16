const user_localStorageKey = 'user'

const getUser = () => {
  const userJSON = window.localStorage.getItem(user_localStorageKey)
  if(!userJSON) return null
  return JSON.parse(userJSON)
}

const saveUser = (user) => {
  window.localStorage.setItem(user_localStorageKey, JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem(user_localStorageKey)
}

export default { getUser, saveUser, removeUser }


