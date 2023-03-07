import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
    if(notification.message === null) return null
    return (
        <div className="container">
            {(notification.message &&
            <Alert variant={notification.style}>
                {notification.message}
            </Alert>)}
        </div>
    )
}

export default Notification