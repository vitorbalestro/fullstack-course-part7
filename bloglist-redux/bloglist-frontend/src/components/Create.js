import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const CreateNewBlogForm = ({ createNewBlogFormRef }) => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    // eslint-disable-next-line no-unused-vars
    const addBlog = (event) => {
        /* function created for test purposes. To test the component CreateNewBlogForm, call this function on submitting
        the blog form (instead of handleCreate). Also DISABLE PROPTYPES TO TEST THIS!!!!*/

        event.preventDefault()

        createBlog({
            title: title,
            author: author,
            url: url
        })
    }

    const handleCreate = async (event) => {
        event.preventDefault()
        createNewBlogFormRef.current.toggleVisibility()
        dispatch(createBlog({ title, author, url }))
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>
                Create new blog:
            </h2>
            <form onSubmit={handleCreate}>
                <div>
                    title:&nbsp;
                    <input type="text" value={title} placeholder='blog title' id='blogtitle'
                        name="Title" onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author:&nbsp;
                    <input type="text" value={author} placeholder='blog author' id='blogauthor'
                        name="Author" onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    url:&nbsp;
                    <input type="text" value={url} placeholder='blog url' id='blogurl'
                        name="URL" onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button id='create-button' className='createButton' type="submit">create</button>
            </form>
        </div>

    )
}

CreateNewBlogForm.propTypes ={
    createNewBlogFormRef: PropTypes.object.isRequired
}

export default CreateNewBlogForm