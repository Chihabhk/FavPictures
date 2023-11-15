import { configureStore } from "@reduxjs/toolkit";
import { catsSlice } from "../features/catsSlice";

export const store = configureStore({
    reducer: {
        cats: catsSlice.reducer,
    },
});
