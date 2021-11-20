import {createSlice} from '@reduxjs/toolkit'


const colourChoices = ['primary', 'danger', 'info', 'warning', 'success', 'dark']

const initialState = {
    title: null,
    message: null,
    colour: null,
    cancelable: true,
    // options: {}
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        addAlert: (state, data) => {
            return {
                title: data.payload.title || null,
                message: data.payload.message || null,
                colour: data.payload.colour || "primary",
                cancelable: data.payload.cancelable || true,
                options: {}
            }
        },
        clear: () => {
            return {
                ...initialState
            };
        }
    },
})

export const {addAlert, clear} = alertSlice.actions

export default alertSlice.reducer