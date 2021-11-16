import { configureStore } from '@reduxjs/toolkit'
import SearchedSymbolReducer from './redux/SearchedSymbol'

export const store = configureStore({
    reducer: {
        searchedSymbol: SearchedSymbolReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})