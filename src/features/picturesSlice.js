import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPicturesAsync = createAsyncThunk(
    "pictures/getPicturesAsync",
    async ({ page }) => {
        try {
            const API_KEY = process.env.REACT_APP_API_KEY;
            const baseURL = new URL(
                "https://api.thecatapi.com/v1/images/search/"
            );
            let headers = new Headers();
            headers.append("x-api-key", API_KEY);

            let params = new URLSearchParams();
            params.append("limit", 15);
            params.append("page", page);
            params.append("has_breeds", 1);

            baseURL.search = params.toString();
            const res = await fetch(baseURL.toString(), { headers });
            if (res.ok) {
                const pictures = await res.json();
                return { pictures };
            }
        } catch (err) {
            console.log("error: " + err);
        }
    }
);

export const fotosSlice = createSlice({
    name: "fotos",
    initialState: {
        pictures: [],
        favorites: [],
        isLoading: false,
    },
    reducers: {
        addPicture(state, action) {
            state.favorites.push(action.payload);
        },
        deletePicture(state, action) {
            state.favorites = state.favorites.filter(
                (picture) => picture.id !== action.payload.id
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPicturesAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPicturesAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.pictures = [
                ...state.pictures,
                ...action.payload.pictures,
            ].reduce((uniquePicArray, pic) => {
                const currentId = pic.id;
                if (
                    currentId &&
                    !uniquePicArray.find((pic) => pic.id === currentId)
                ) {
                    uniquePicArray.push(pic);
                }
                return uniquePicArray;
            }, []);
        });
    },
});

export const { addPicture, deletePicture } = fotosSlice.actions;

export default fotosSlice.reducer;
