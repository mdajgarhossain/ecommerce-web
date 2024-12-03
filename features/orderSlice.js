import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/util/apiService';
import { toast } from 'react-toastify';

export const fetchMyOrders = createAsyncThunk(
    'orders/fetchMyOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get('/orders/my-orders');
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch orders');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const fetchOrderDetails = createAsyncThunk(
    'orders/fetchOrderDetails',
    async (orderNumber, { rejectWithValue }) => {
        try {
            const response = await apiService.get(`/orders/my-orders/${orderNumber}`);
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch order details');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const placeOrder = createAsyncThunk(
    'orders/placeOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/orders/place-order', orderData);
            toast.success(response.success || 'Order placed successfully');
            return response;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        currentOrder: null,
        loading: false,
        error: null,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            total: 0
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.data;
                state.pagination = {
                    currentPage: action.payload.current_page,
                    totalPages: action.payload.last_page,
                    total: action.payload.total
                };
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload.order;
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default orderSlice.reducer;