import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authToken: null,
}

export const authTokenSlice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        setAuthToken: (state, action) => {
            // Set the auth token in the state
            state.authToken = action.payload

            // Set the auth token in local storage
            localStorage.setItem('authtoken', action.payload)
        },
        removeAuthToken: (state) => {
            // Remove the auth token from the state
            state.authToken = null

            // Remove the auth token from local storage
            localStorage.removeItem('authtoken')
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAuthToken, removeAuthToken } = authTokenSlice.actions

export default authTokenSlice.reducer
