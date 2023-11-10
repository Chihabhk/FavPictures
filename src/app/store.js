import { configureStore } from "@reduxjs/toolkit";
import picturesReducer from "../features/picturesSlice";

const store = configureStore({
    reducer: { picture: picturesReducer },
});

export { store };
