import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Blogs from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import DisplayUser from './components/User'
import ToggableCreateNewBlogForm from './components/ToggableCreateForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeAllUsers } from './reducers/allUsersReducer'
import { loadUser } from './reducers/userReducer'
import AllUsers from './components/AllUsers'

const App = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const notification = useSelector(state => state.notification)
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(loadUser())
        dispatch(initializeAllUsers())
    },[dispatch])
    return (

        <div>
            <h1>Blog List App!</h1>
            <Notification notification={notification} />
            { user === null ?
                <LoginForm dispatch={dispatch} />
                : <>
                    <DisplayUser dispatch={dispatch} />
                    <ToggableCreateNewBlogForm />
                    <Blogs dispatch={dispatch}/>
                    <AllUsers />
                </>
            }

        </div>
    )
}

export default App