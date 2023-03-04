import { createSlice } from '@reduxjs/toolkit'

const successfulNotificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const errorNotificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const initialState = {
    message: null,
    style: null
}


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setSuccessNotification(state,action){
            return{ message: action.payload.message, style: successfulNotificationStyle }
        },
        setErrorNotification(state, action){
            return{ message: action.payload.message, style: errorNotificationStyle }
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