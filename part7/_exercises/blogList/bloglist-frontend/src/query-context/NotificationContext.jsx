import { useState, createContext } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {

  const [message, setMessage] = useState({ content: '', isError:false })

  const [timeoutId, setTimeoutID] = useState(null)

  const notify = (newMessage) => {
    if(timeoutId){
      clearTimeout(timeoutId)
    }
    setMessage(newMessage)
    const newTimeoutId = setTimeout(() => {
      setMessage({ content: '', isError:false })
    }, 5000)
    setTimeoutID(newTimeoutId)
  }


  return(
    <NotificationContext.Provider value={ { message, notify } }>
      {props}
    </NotificationContext.Provider>
  )

}

