import { configureStore } from '@reduxjs/toolkit'
import SearchedSymbolReducer from './redux/SearchedSymbol'
import UserReducer from './redux/User'
import AlertReducer from './redux/Alert'
import NotificationReducer from './redux/Notification'

export const store = configureStore({
    reducer: {
        searchedSymbol: SearchedSymbolReducer,
        userInfo: UserReducer,
        alert: AlertReducer,
        notification: NotificationReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})