import { useState, createContext } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import persistentUser from '../services/persistentUser'

const UserContext = createContext()

export const UserContextProvider = (props) => {

  const [user, setUser] = useState()

  const initialize = () => {
    const user = persistentUser.getUser()
    if (user) {
      blogService.setAuthToken(user.token)
      setUser(user)
    }
  }

  const login = async (username, password) => {
    const loggedInUser = await loginService.login({ username, password })
    console.log('logged in user', loggedInUser)
    persistentUser.saveUser(loggedInUser)
    blogService.setAuthToken(loggedInUser.token)
    setUser(loggedInUser)
  }

  const logout = () => {
    persistentUser.removeUser()
    blogService.setAuthToken(null)
    setUser(null)
  }
  return(
    <UserContext.Provider value={ { user, initialize, login, logout } }>
      {props.children}
    </UserContext.Provider>
  )

}


export default UserContext