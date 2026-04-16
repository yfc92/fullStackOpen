import { useState, createContext, useReducer } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
  const notifyActionType = 'notify'
  const reducer = (state, action) => {
    //console.log('notification reducer called. state:', state,' action:', action)
    if(action.type === notifyActionType){
      return {
        ...action.nextMessage
      }
    }
    throw Error('Unknown action.')
  }
  const defaultMessage = { content: '', isError:false }
  //const [message, setMessage] = useState({ content: '', isError:false })
  const [message, dispatch] = useReducer(reducer, defaultMessage)

  const [timeoutId, setTimeoutID] = useState(null)

  const notify = (newMessage) => {
    if(timeoutId){
      clearTimeout(timeoutId)
    }

    dispatch({
      type: notifyActionType,
      nextMessage: newMessage
    })
    //setMessage(newMessage)

    const newTimeoutId = setTimeout(() => {
      dispatch({
        type: notifyActionType,
        nextMessage: defaultMessage
      })
      //setMessage(defaultMessage)
    }, 5000)
    setTimeoutID(newTimeoutId)
  }


  return(
    <NotificationContext.Provider value={ { message, notify } }>
      {props.children}
    </NotificationContext.Provider>
  )

}

