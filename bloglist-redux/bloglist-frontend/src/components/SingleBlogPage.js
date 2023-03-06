import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import getLoggedUserId from '../utils/user'
import { useNavigate } from 'react-router-dom'

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



const RemoveButton = ({ blog, dispatch }) => {
    const navigate = useNavigate()
    function handleDelete(blog, dispatch){
        if(window.confirm(`Remove blog '${blog.title}' by '${blog.author}'`)){
            const id = blog.id
            dispatch(deleteBlog(id))
            navigate('/blogs')
        }
    }

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


const LikeButton = ({ blog, dispatch }) => {
    return (
        <button className="likeButton" id='likeButton' type="submit" onClick={() => incrementLike(blog,dispatch)}>like</button>
    )
}


const SingleBlogPage = ({ blog, dispatch }) => {
    return (
        <div>
            <h1>
                {blog.title}
            </h1><div>
                {blog.url}
            </div><div>
                    likes&nbsp;{blog.likes} &nbsp;
                <LikeButton blog={blog} dispatch={dispatch} />
            </div><div>
                {blog.author}
            </div><RemoveButton blog={blog} dispatch={dispatch} />
        </div>
    )

}

export default SingleBlogPage