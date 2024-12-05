import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    const payload = action.payload as User;
                    state.user = payload;
                }
            )
            .addMatcher(
                authApi.endpoints.logout.matchFulfilled,
                (state) => {
                    state.user = null;
                }
            );
    },
});

// Export the reducer, not the entire slice
export default authSlice.reducer;


