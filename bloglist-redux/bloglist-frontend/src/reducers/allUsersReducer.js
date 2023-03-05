import { createSlice } from '@reduxjs/toolkit'
import allUsersService from '../services/users'

const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState: [],
    reducers: {
        setAllUsers(state,action){
            return action.payload
        }
    }
})

export const initializeAllUsers = () => {
    return async dispatch => {
        const users = await allUsersService.getAll()
        dispatch(setAllUsers(users))
    }
}

export default allUsersSlice.reducer

export const { setAllUsers } = allUsersSlice.actions