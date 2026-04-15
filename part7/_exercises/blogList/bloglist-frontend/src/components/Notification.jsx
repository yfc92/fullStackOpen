import { Alert } from '@mui/material'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const className = message.isError ? 'error' : 'statusUpdate'
  const severityType = message.isError ? 'error' : 'success'
  // return (
  //   <div className={className}>
  //     {message.content}
  //   </div>
  // )
  return (
    <Alert
      className={className}
      style={{ marginTop: 10, marginBottom: 10 }}
      severity={severityType}
    >
      {message.content}
    </Alert>
  )
}

export default Notification
