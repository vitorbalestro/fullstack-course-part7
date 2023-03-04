import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setSuccessNotification, setErrorNotification, clearNotification } from '../reducers/notificationReducer'


function compareLikes(blog1, blog2){
    if(blog1.likes < blog2.likes){
        return 1
    }
    if(blog1.likes > blog2.likes){
        return -1
    }
    if(blog1.likes === blog2.likes){
        return 0
    }
}

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state,action){
            return action.payload.sort(compareLikes)
        },
        appendBlog(state, action){
            return [...state, action.payload]
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        try {
            const newBlog = await blogService.create(content)
            dispatch(appendBlog(newBlog))
            dispatch(setSuccessNotification({ message: `Blog '${newBlog.title}' by '${newBlog.author}' created!` }))
            setTimeout(() => dispatch(clearNotification()),5000)
        } catch(exception) {
            dispatch(setErrorNotification({ message: `Failed to create blog with the following error message: ${exception.response.data.error}` }))
            setTimeout(() => dispatch(clearNotification()), 5000)
        }
    }
}

export const updateBlog = (id, updatedBlog) => {
    return async dispatch => {
        await blogService.update(id, updatedBlog)
        dispatch(initializeBlogs())
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch(initializeBlogs())
    }
}

export const { setBlogs, appendBlog } = blogSlice.actions

export default blogSlice.reducer