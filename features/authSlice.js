import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/util/apiService';
import { toast } from 'react-toastify';

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/customer/login', credentials);
            // Store token in localStorage
            localStorage.setItem('token', response.access_token);
            // Show success toast
            toast.success(response.message || 'Login successful');
            return response;
        } catch (error) {
            // Show error toast
            toast.error(error.response?.data?.message || 'Login failed');
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/customer/register', userData);
            toast.success(response.message || 'Registration successful');
            return response;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            toast.success('Logged out successfully');
        },
        checkAuthState: (state) => {
            const token = localStorage.getItem('token');
            if (token) {
                state.token = token;
                state.isAuthenticated = true;
            } else {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.access_token;
                state.user = action.payload.data;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, checkAuthState } = authSlice.actions;
export default authSlice.reducer;