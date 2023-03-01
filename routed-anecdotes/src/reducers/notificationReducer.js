import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setCreateNewNotification(state, action){
            return `anecdote '${action.payload}' created`

        },
        clearNotification(state, action){
            return null
        }
    }
})

export const { setCreateNewNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer