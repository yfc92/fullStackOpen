const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const className = message.isError ? "error" : "statusUpdate"
  return (
    <div className={className}>
      {message.content}
    </div>
  )
}

export default Notification