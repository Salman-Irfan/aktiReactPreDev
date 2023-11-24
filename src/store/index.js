import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../store/slices/counterSlice'
import authTokenReducer from '../store/slices/authTokenSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        authToken: authTokenReducer
    },
})