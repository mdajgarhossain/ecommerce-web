import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/util/apiService';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page = 1, perPage = 10, category, subcategory, subsubcategory, search }, { rejectWithValue }) => {
        try {
            let url = '/products';
            
            // If category params exist, use the category endpoint
            if (category) {
                url = `/product-category/${category}`;
                if (subcategory) {
                    url += `/${subcategory}`;
                    if (subsubcategory) {
                        url += `/${subsubcategory}`;
                    }
                }
            }

            // Add pagination parameters
            url += `?page=${page}&per_page=${perPage}`;
            
            // Add search parameter if it exists
            if (search) {
                url += `&search=${encodeURIComponent(search)}`;
            }
            
            const response = await apiService.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
        currentPage: 1,
        totalPages: 1,
        perPage: 10,
        total: 0,
    },
    reducers: {
        setPerPage: (state, action) => {
            state.perPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.currentPage = action.payload.current_page;
                state.totalPages = action.payload.last_page;
                state.total = action.payload.total;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setPerPage } = productSlice.actions;
export const selectProducts = (state) => state.products;
export default productSlice.reducer;