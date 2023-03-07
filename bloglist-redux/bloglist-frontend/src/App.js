import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeAllUsers } from './reducers/allUsersReducer'
import { loadUser } from './reducers/userReducer'
import Home from './components/Home'
import { BrowserRouter as Router } from 'react-router-dom'



const App = () => {

    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(loadUser())
        dispatch(initializeAllUsers())
    },[dispatch])
    return (

        <div className="container">
            <div className="mt-5">
                <Notification notification={notification} />
            </div>
            <Router>
                <Home dispatch={dispatch} />
            </Router>
        </div>
    )
}

export default App