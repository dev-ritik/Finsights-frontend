import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {API_URL} from "../constants";

const emptyLastSearch = {
    type: ``,
    exchange: `NSE`,
    symbol: ``
}

const initialState = {
    lastSearch: emptyLastSearch,
    stocks: [],
    dropdownOpen: false,
    message: ""
}

export const newSearch = createAsyncThunk(
    'searchedSymbol/newSearch',
    async (searchText, {dispatch}) => {
        if (searchText.length <= 2) {
            // Ignoring small string
            dispatch(message("Start searching with 3 letters"))
            return
        }
        return await axios.get(`${API_URL}/instrument/all`, {
            params: {
                query_str: `${searchText}`,
                exchange: `NSE`,
                stock: 'true',
                index: 'true'
            }
        }).then(res => res.data)
    }
)
export const searchSlice = createSlice({
    name: 'searchedSymbol',
    initialState,
    reducers: {
        newSymbolSelection: (state, action) => {
            return {
                ...state,
                lastSearch: {
                    type: action.payload.type,
                    exchange: `NSE`,
                    symbol: action.payload.symbol
                },
            }
        },
        hideDropdown: (state,) => {
            return {
                ...state,
                dropdownOpen: false,
            }
        },
        message: (state, action) => {
            return {
                ...state,
                dropdownOpen: true,
                stocks: [],
                message: action.payload
            }
        },
        newState: (state, action) => {
            return {
                ...action.payload,
            }
        }
    },
    extraReducers: {
        [newSearch.fulfilled]: (state, data) => {
            if (data.payload === undefined) {
                return
            }
            let message = ""
            if (data.payload.length === 0) {
                message = "No results found"
            }
            return {
                ...state
                , stocks: data.payload, dropdownOpen: true, message: message
            };
            // return res.data;
        }, [newSearch.rejected]: (state, payload) => {
            return {
                lastSearch: emptyLastSearch, stocks: [], dropdownOpen: true, message: payload.error.message
            };
        }
    }
})

export const {newSymbolSelection, hideDropdown, message} = searchSlice.actions

export default searchSlice.reducer