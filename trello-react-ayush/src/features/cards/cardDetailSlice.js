import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: true,
    error: '',
    data: [],
};

export const fetchCardDetail = createAsyncThunk('cardDetail/fetchCardDetail', ({ cardId }) => {
    return axios({
        method: "GET",
        url: `http://localhost:3000/cards/${cardId}`,
        // url: `https://api.trello.com/1/cards/${cardId}`,
        params: {
            // key: import.meta.env.VITE_API_KEY,
            // token: import.meta.env.VITE_TOKEN
        }
    })
        .then((res) => {
            return res.data;
        })
});

const cardDetailSlice = createSlice({
    name: 'cardDetail',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchCardDetail.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchCardDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = ''
        })
        builder.addCase(fetchCardDetail.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error.message;
        })

    }
})

export default cardDetailSlice.reducer;