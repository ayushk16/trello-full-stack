import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: '',
    data: [],
}

export const fetchBoard = createAsyncThunk('board/fetchBoard', (boardId) => {
    return axios({
        method: "GET",
        url: `http://localhost:3000/boards/${boardId}`,
        // params: {
        //     key: import.meta.env.VITE_API_KEY,
        //     token: import.meta.env.VITE_TOKEN
        // }
    })
        .then((res) => {
            return res.data;
        })
})

const boardSlice = createSlice({
    name: 'board',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchBoard.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = '';
        })
        builder.addCase(fetchBoard.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = '';
        })
        builder.addCase(fetchBoard.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error.message;
        })
    }
})

export default boardSlice.reducer;