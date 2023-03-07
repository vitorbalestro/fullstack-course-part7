import { useState } from 'react'
import { updateBlog } from '../reducers/blogReducer'

const CommentForm = ({ blog, dispatch }) => {

    const [comment, setComment] = useState('')

    function handleAddComment(event,blog,dispatch) {
        event.preventDefault()
        const id = blog.id
        const updatedBlog = {
            title: blog.title,
            url: blog.url,
            author: blog.author,
            likes: blog.likes,
            comments: blog.comments === undefined
                ? [].concat(comment)
                : blog.comments.concat(comment)
        }
        dispatch(updateBlog(id, updatedBlog))
        setComment('')
    }

    return(
        <div>
            <h2>comments</h2>
            <form onSubmit={(event) => handleAddComment(event,blog,dispatch)}>
                <input type="text" value={comment} name="Comment" onChange={({ target }) => setComment(target.value)} />
                <button id='add-comment-button' type="submit">add comment</button>
            </form>
        </div>
    )

}

export default CommentForm