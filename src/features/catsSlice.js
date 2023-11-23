import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPicturesAsync = createAsyncThunk(
    "cats/getPicturesAsync",
    async ({ page }) => {
        try {
            const API_KEY = process.env.REACT_APP_API_KEY;
            const API_URL = process.env.REACT_APP_API_URL;
            const baseURL = new URL(API_URL);
            let headers = new Headers();
            headers.append("x-api-key", API_KEY);

            let params = new URLSearchParams();
            params.append("limit", 15);
            params.append("page", page);
            params.append("has_breeds", 1);

            baseURL.search = params.toString();
            const res = await fetch(baseURL.toString(), { headers });
            if (res.ok) {
                const images = await res.json();
                return { images };
            }
        } catch (err) {
            console.log("error: " + err);
        }
    }
);

export const catsSlice = createSlice({
    name: "cats",
    initialState: {
        images: [],
        favorites: [],
        currentPage: 0,
        isLoading: false,
        isFavoritesPage: false,
        isModalOpen: false,
        selectedCat: null,
    },
    reducers: {
        addFavorite: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(
                (favorite) => favorite.id !== action.payload.id
            );
        },
        setFavoritesPage(state, action) {
            state.isFavoritesPage = action.payload;
        },
        setModalOpen(state, action) {
            state.isModalOpen = action.payload.state;
            state.selectedCat = action.payload.selectedCat;
        },
        exploreMore(state, action) {
            state.isLoading = true;
            state.currentPage += 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPicturesAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPicturesAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            const imagesMap = state.images
                .concat(action.payload.images)
                .reduce((map, pic) => {
                    map[pic.id] = pic;
                    return map;
                }, {});

            state.images = Object.values(imagesMap);
        });
    },
});

export const {
    addFavorite,
    removeFavorite,
    exploreMore,
    setFavoritesPage,
    setModalOpen,
} = catsSlice.actions;

export default catsSlice.reducer;
