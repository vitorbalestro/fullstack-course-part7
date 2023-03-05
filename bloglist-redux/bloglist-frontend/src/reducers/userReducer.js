import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setSuccessNotification, setErrorNotification, clearNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        logOutUser() {
            window.localStorage.removeItem('loggedUser')
            return null
        }
    }
})

export const loadUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
        else dispatch(setUser(null))
    }
}

export const logInUser = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            dispatch(setUser(user))
            blogService.setToken(user.token)
            dispatch(setSuccessNotification({ message: 'Logged in!' }))
            setTimeout(() => dispatch(clearNotification()), 5000)
        } catch (exception) {
            dispatch(setErrorNotification({ message: 'Wrong credentials' }))
            setTimeout(() => dispatch(clearNotification()), 5000)
        }
    }
}

export const { setUser, logOutUser } = userSlice.actions

export default userSlice.reducer