const Notification = ({ message, success }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const newNotificationStyle = { ...notificationStyle, color: 'red' }
  if (message === null) {
    return null
  }
  if (!success) {
    return (
      <div style={newNotificationStyle}>
        {message}
      </div>
    )
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}
export default Notification