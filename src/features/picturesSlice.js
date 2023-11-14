import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPicturesAsync = createAsyncThunk(
    "pictures/getPicturesAsync",
    async ({ page }) => {
        try {
            const API_KEY = process.env.REACT_APP_API_KEY;
            const baseURL = new URL(
                "https://api.thecatapi.com/v1/images/search/"
            );
            baseURL.searchParams.append("api_key", API_KEY);
            baseURL.searchParams.append("limit", 9);
            baseURL.searchParams.append("has_breeds", 1);
            const res = await fetch(baseURL.toString());
            if (res.ok) {
                const pictures = await res.json();
                return { pictures };
            }
        } catch (err) {
            console.log("error: " + err);
        }
    }
);

// export const searchCatsByTag = createAsyncThunk(
//     "pictures/searchCatsByTag",
//     async (payload) => {
//         try {
//             const res = await fetch(url.toString());
//         } catch (err) {
//             throw new Error(err);
//         }
//     }
// );

export const picturesSlice = createSlice({
    name: "pictures",
    initialState: [],
    reducers: {
        addPicture(state, action) {
            state.favorites.push(action.payload);
        },
        deletePicture(state, action) {
            return state.filter((picture) => picture !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(getPicturesAsync.pending, (state) => {
        //     state.isLoading = true;
        // });
        builder.addCase(getPicturesAsync.fulfilled, (state, action) => {
            // state.isLoading = false;
            return [...state, ...action.payload.pictures].reduce(
                (uniquePicArray, pic) => {
                    const currentId = pic.id;
                    if (
                        currentId &&
                        !uniquePicArray.find((pic) => pic.id === currentId)
                    ) {
                        uniquePicArray.push(pic);
                    }
                    return uniquePicArray;
                },
                []
            );
        });
    },
});

export const { addPicture, deletePicture } = picturesSlice.actions;

export default picturesSlice.reducer;
