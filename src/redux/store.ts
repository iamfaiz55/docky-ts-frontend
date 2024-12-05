import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import { docApi } from "./apis/docApi";
import authSlice from "./authSlice";

const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [docApi.reducerPath]: docApi.reducer,
        user: authSlice
    },
    middleware: (def) =>
        def().concat(authApi.middleware, docApi.middleware),
});


export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export default reduxStore;
