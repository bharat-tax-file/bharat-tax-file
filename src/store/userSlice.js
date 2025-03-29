import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch user profile details (including available filings & tax profile)
export const fetchUserDetail = createAsyncThunk('/user/profile', async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/user/profile');
    return response.data.payload;
});

export const taxUserSlice = createSlice({
    name: 'user',
    initialState: {
        pageTitle: "GST & ITR Filing Dashboard",
        availableFilings: 0,  // Number of ITR or GST filings available
        userName: "",
        isLoggedIn: false,
        token: null,
        scrollId: new Date().getTime(),
        isLoading: false,
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
            if (!action.payload) {
                state.token = null;
                axios.defaults.headers.common['Authorization'] = null;
            }
        },

        setAvailableFilings: (state, action) => {
            state.availableFilings = action.payload;  // Set available tax filings
        },

        updateAvailableFilings: (state, action) => {
            state.availableFilings = state.availableFilings + action.payload;  // Update filings count
        },

        setScrollId: (state, action) => {
            state.scrollId = action.payload;
        },

        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);

            axios.interceptors.request.use(
                (config) => {
                    config.headers.Authorization = `Bearer ${action.payload}`;
                    return config;
                },
                (error) => Promise.reject(error)
            );
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserDetail.fulfilled, (state, action) => {
                console.log(action.payload);
                state.availableFilings = action.payload.availableFilings;  // Update user’s filings
                state.userName = action.payload.userName;
                state.isLoading = false;
            })
            .addCase(fetchUserDetail.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setLoggedIn, setToken, setAvailableFilings, setScrollId, updateAvailableFilings } = taxUserSlice.actions;
export default taxUserSlice.reducer;
