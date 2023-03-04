const Notification = ({ notification }) => {
    if(notification.message === null) return null
    return (
        <div className='notification' id='notification' style={notification.style}>
            {notification.message}
        </div>
    )
}

export default Notification