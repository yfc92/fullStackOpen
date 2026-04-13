import { createContext, useState } from "react"

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {

  const [message, setMessage] = useState('')

  const [timeoutId, setTimeoutID] = useState(null)

  const notify = (newMessage) => {
    if(timeoutId){
      clearTimeout(timeoutId)
    }
    setMessage(newMessage)
    const newTimeoutId = setTimeout(() => {
      setMessage('')
    }, 5000)
    setTimeoutID(newTimeoutId)
  }

  return (
    <NotificationContext.Provider value={ {message, notify} }>
      {props.children}
    </NotificationContext.Provider>
  )

}