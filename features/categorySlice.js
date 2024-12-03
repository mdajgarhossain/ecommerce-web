import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/util/apiService';

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { getState, rejectWithValue }) => {
        // Check if categories are already loaded
        const { categories } = getState();
        if (categories.items.length > 0) {
            return categories.items; // Return existing categories if already loaded
        }

        try {
            const response = await apiService.get('/categories-hierarchy');
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        loading: false,
        error: null,
        isInitialized: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.isInitialized = true;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Selector
export const selectCategories = (state) => state.categories;

export default categorySlice.reducer;