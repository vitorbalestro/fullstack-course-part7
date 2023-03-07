import Menu from './Menu'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import { Routes, Route, useMatch } from 'react-router-dom'
import BlogsPage from './BlogsPage'
import AllUsers from './AllUsers'
import SingleBlogPage from './SingleBlogPage'
import UserDisplay from './UserDisplay'

const EmptyLoginForm = () => {
    return (
        <>
        </>
    )
}

const Home = ({ dispatch }) => {

    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)
    const allUsers = useSelector(state => state.allUsers)
    const blogMatch = useMatch('/blogs/:id')
    const blog = blogMatch
        ? blogs.find(blog => blog.id === blogMatch.params.id)
        : null

    const userMatch = useMatch('/users/:id')
    const selectedUser = userMatch
        ? allUsers.find(user => user.id === userMatch.params.id)
        : null
    return(
        <div>
            <h1>Blog List App!</h1>
            {user === null ?
                <></>
                :<>
                    <Menu dispatch={dispatch}/>
                </>
            }
            <Routes>
                {user=== null?
                    <Route path='/' element={<LoginForm dispatch={dispatch} />} />
                    :<Route path='/' element={<EmptyLoginForm />} />
                }
                <Route path='/blogs' element={<BlogsPage />} />
                <Route path='/users' element={<AllUsers />} />
                <Route path='/blogs/:id' element={<SingleBlogPage blog={blog} dispatch={dispatch} />} />
                <Route path='/users/:id' element={<UserDisplay user={selectedUser} />} />
            </Routes>
        </div>
    )
}

export default Home

