import {createSlice} from '@reduxjs/toolkit'
import moment from "moment";


const colourChoices = ['default', 'info', 'warning', 'success', 'error']

const initialState = {
    title: null,
    message: null,
    colour: null,
    created_at: ""
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, data) => {
            return {
                title: data.payload.title || null,
                message: data.payload.message || null,
                colour: data.payload.colour || "default",
                created_at: moment().unix(),
            }
        },
    },
})

export const {addNotification} = notificationSlice.actions

export default notificationSlice.reducer