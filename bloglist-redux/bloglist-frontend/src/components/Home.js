import Menu from './Menu'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import { Routes, Route, useMatch } from 'react-router-dom'
import BlogsPage from './BlogsPage'
import AllUsers from './AllUsers'
import SingleBlogPage from './SingleBlogPage'

const EmptyLoginForm = () => {
    return (
        <>
        </>
    )
}

const Home = ({ dispatch }) => {

    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)
    const blogMatch = useMatch('/blogs/:id')
    const blog = blogMatch
        ? blogs.find(blog => blog.id === blogMatch.params.id):
        null
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
                <Route path='/blogs' element={<BlogsPage dispatch={dispatch}/>} />
                <Route path='/users' element={<AllUsers />} />
                <Route path='/blogs/:id' element={<SingleBlogPage blog={blog} dispatch={dispatch} />} />
            </Routes>
        </div>
    )
}

export default Home

