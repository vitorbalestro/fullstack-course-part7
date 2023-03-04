import { useState } from 'react'
import getLoggedUserId from '../utils/user'
import { useSelector } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

function incrementLike(blog, dispatch){
    const id = blog.id
    const updatedBlog = {
        title: blog.title,
        url: blog.url,
        author: blog.author,
        likes: blog.likes + 1
    }
    dispatch(updateBlog(id, updatedBlog))
}

function handleDelete(blog, dispatch){
    if(window.confirm(`Remove blog '${blog.title}' by '${blog.author}'`)){
        const id = blog.id
        dispatch(deleteBlog(id))
    }
}

const RemoveButton = ({ blog, dispatch }) => {

    var blogUserId

    if(typeof blog.user === 'string'){
        blogUserId = blog.user
    } else {
        blogUserId = blog.user.id
    }
    const loggedUserId = getLoggedUserId()

    return (
        loggedUserId === blogUserId ?
            <div>
                <button type="submit" id='deleteButton' onClick={() => {
                    handleDelete(blog,dispatch)
                }}>remove</button>
            </div>
            : <>
            </>
    )
}

const ViewButton = ({ setView }) => {
    return (
        <>
            <button className='viewButton' id='viewButton' type="submit" onClick={() => {setView(true)}}>view</button>
        </>
    )
}

const LikeButton = ({ blog, dispatch }) => {
    return (
        <button className="likeButton" id='likeButton' type="submit" onClick={() => incrementLike(blog,dispatch)}>like</button>
    )
}

const Blog = ({ blog, dispatch }) => {

    const [view, setView] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        view ?
            <div className='blog' style={blogStyle}>
                <div>
                    {blog.title}&nbsp;
                    <button type="submit" id='hideButton' onClick={() => { setView(false) } }>hide</button>
                </div><div>
                    {blog.url}
                </div><div>
                        likes&nbsp;{blog.likes} &nbsp;
                    <LikeButton blog={blog} dispatch={dispatch} />
                </div><div>
                    {blog.author}
                </div><RemoveButton blog={blog} dispatch={dispatch} />
            </div>
            :
            <div className='blog' style={blogStyle}>
                {blog.title}&nbsp;
                <ViewButton setView={setView} />
            </div>


    )
}

const Blogs = ({ dispatch }) => {

    const blogs = useSelector(state => state.blogs)
    return(
        <>
            <h2>Blogs</h2>
            <div>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} dispatch={dispatch} />)}
            </div>
        </>
    )
}

export default Blogs