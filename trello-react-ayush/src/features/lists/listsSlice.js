import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    loading: false,
    data: [],
    error: '',
}

export const fetchLists = createAsyncThunk('lists/fetchList', (boardId) => {
    return axios({
        method: "Get",
        // url: `https://api.trello.com/1/boards/${boardId}/lists`,
        url: `http://localhost:3000/boards/${boardId}/lists`,
        // params: {
        //     key: import.meta.env.VITE_API_KEY,
        //     token: import.meta.env.VITE_TOKEN
        // }
    }).then((res) => {
        return res.data
    })
})

export const archiveList = createAsyncThunk('lists/archiveList', (listId) => {
    return axios({
        method: 'PUT',
        url: `http://localhost:3000/lists/${listId}/closed`,
        // url: `https://api.trello.com/1/lists/${listId}/closed`,
        params: {
            value: true,
            // key: import.meta.env.VITE_API_KEY,
            // token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            return res.data;
        })
})

export const addList = createAsyncThunk('lists/addList', ({ boardId, value }) => {
    return axios({
        method: 'POST',
        url: `http://localhost:3000/lists`,
        // url: `https://api.trello.com/1/lists`,
        params: {
            name: value,
            idBoard: boardId,
            // key: import.meta.env.VITE_API_KEY,
            // token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            return res.data;
        })
})

const listSlice = createSlice({
    name: 'lists',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchLists.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = ''
        })
        builder.addCase(fetchLists.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = ''
        })
        builder.addCase(fetchLists.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error.message;
        })
        builder.addCase(addList.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(addList.fulfilled, (state, action) => {
            state.loading = false;
            state.data.push(action.payload);
            state.error = '';
        })
        builder.addCase(addList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(archiveList.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(archiveList.fulfilled, (state, action) => {
            state.loading = false;
            state.data = state.data.filter(list => list.id !== action.payload.id);
            state.error = '';
        })
        builder.addCase(archiveList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

    }
})

export default listSlice.reducer