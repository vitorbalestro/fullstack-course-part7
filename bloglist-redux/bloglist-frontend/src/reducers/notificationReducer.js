import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    message: null,
    style: null
}


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setSuccessNotification(state,action){
            return{ message: action.payload.message, style: 'success' }
        },
        setErrorNotification(state, action){
            return{ message: action.payload.message, style: 'danger' }
        },
        clearNotification() {
            return{
                message: null,
                style: null,
            }
        }
    }
})


export const { setSuccessNotification, setErrorNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer