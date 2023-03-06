import { setSuccessNotification, clearNotification } from '../reducers/notificationReducer'
import { logOutUser } from '../reducers/userReducer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const DisplayUser = ({ dispatch }) => {

    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const handleLogout = () => {
        dispatch(logOutUser())
        dispatch(setSuccessNotification({ message: 'Succesfully logged out!' }))
        navigate('/')
        setTimeout(() => dispatch(clearNotification()),5000)
    }
    if(!user) return null

    const name = user.name
    return(
        <>
            {name} logged in&nbsp;
            <button type="submit" onClick={handleLogout}>logout</button>
        </>
    )
}

export default DisplayUser