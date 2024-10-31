import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: null,
    isLoggedIn: false, // Track if the user is logged in
    loggedInUserId: null // Optional: Track the logged-in user's ID if needed
}

const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            const { accessToken, userId } = action.payload; // Expect userId from the payload
            state.token = accessToken;
            state.isLoggedIn = true; // Set logged-in state to true
            state.loggedInUserId = userId; // Store user ID if available
        },
        setLogout: (state, action) => {
            state.token = null;
            state.isLoggedIn = false; // Set logged-in state to false
            state.loggedInUserId = null; // Reset user ID
        },
    }

})

export const { setLogin, setLogout } = authSlice.actions
export default authSlice.reducer;