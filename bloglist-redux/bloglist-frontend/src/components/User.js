import { setSuccessNotification, clearNotification } from '../reducers/notificationReducer'
import { logOutUser } from '../reducers/userReducer'
import { useSelector } from 'react-redux'

const DisplayUser = ({ dispatch }) => {

    const user = useSelector(state => state.user)

    const handleLogout = () => {
        dispatch(logOutUser())
        dispatch(setSuccessNotification({ message: 'Succesfully logged out!' }))
        setTimeout(() => dispatch(clearNotification()),5000)
    }

    const name = user.name
    return(
        <div>
            <p>
                {name} logged in&nbsp;
                <button type="submit" onClick={handleLogout}>logout</button>
            </p>
        </div>
    )
}

export default DisplayUser