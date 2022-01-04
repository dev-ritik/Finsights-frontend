import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {API_URL} from "../constants";
import {checkAndFetchValidAccessKey} from "./User";
import {addNotification} from "./Notification";

const initialState = []

export const update = createAsyncThunk(
    'wishlist/update',
    async (payload, {dispatch}) => {
        return await checkAndFetchValidAccessKey()
            .then(async access => {
                return await axios.get(`${API_URL}/portfolio/wishlists`, {
                        headers: {
                            'Authorization': `Bearer ${access}`
                        }
                    }
                ).then(res => res.data)
                    .catch(() => {
                        dispatch(addNotification({
                                title: "Error!",
                                message: "Error occurred while fetching existing wishlist",
                                colour: "error"
                            })
                        )
                    });
            }).catch(e => {
                dispatch(addNotification({
                        title: "Error!",
                        message: e.message,
                        colour: "error"
                    })
                )
            });
    }
)
export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: {
        [update.fulfilled]: (state, data) => {
            if (data.payload === undefined) {
                return
            }
            return data.payload;
        }
    }
})

export default wishlistSlice.reducer