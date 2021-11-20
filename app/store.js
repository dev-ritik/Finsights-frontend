import { configureStore } from '@reduxjs/toolkit'
import SearchedSymbolReducer from './redux/SearchedSymbol'
import UserReducer from './redux/User'
import success from './redux/Alert'

export const store = configureStore({
    reducer: {
        searchedSymbol: SearchedSymbolReducer,
        userInfo: UserReducer,
        alert: success,
    },
    devTools: process.env.NODE_ENV !== 'production',
})