import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    data: {},
    error: '',
}

const removeDuplicates = (arr) => {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
        if (unique_array.findIndex((card) => card.id === arr[i].id) === -1) {
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

export const fetchCards = createAsyncThunk('listCards/fetchCards', ({ listId }) => {

    return axios({
        method: "GET",
        url: `http://localhost:3000/lists/${listId}/cards`,
        // url: `https://api.trello.com/1/lists/${listId}/cards`,
        params: {
            // key: import.meta.env.VITE_API_KEY,
            // token: import.meta.env.VITE_TOKEN
        }
    })
        .then((res) => {
            return res.data;
        })
})

export const addCard = createAsyncThunk('listCards/addCard', ({ listId, value }) => {
    return axios({
        method: 'POST',
        url: `http://localhost:3000/cards`,
        // url: `https://api.trello.com/1/cards`,
        params: {
            name: value,
            idList: listId,
            // key: import.meta.env.VITE_API_KEY,
            // token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            return { data: res.data, idList: listId };
        })
})

export const deleteCard = createAsyncThunk('listCards/deleteCard', ({ listId, cardId }) => {
    return axios({
        method: 'DELETE',
        url: `http://localhost:3000/cards/${cardId}`,
        // url: `https://api.trello.com/1/cards/${cardId}`,
        params: {
            // key: import.meta.env.VITE_API_KEY,
            // token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            return { cardId: cardId, idList: listId };
        })
})

const listCardsSlice = createSlice({
    name: 'listCards',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchCards.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload && action.payload[0]) {
                state.data[action.payload[0].idList] === undefined ? state.data[action.payload[0].idList] = [...action.payload] : state.data[action.payload[0].idList] = [...state.data[action.payload[0].idList], ...action.payload]
                state.data[action.payload[0].idList] = removeDuplicates(state.data[action.payload[0].idList]);
            }
            state.error = '';
        })
        builder.addCase(fetchCards.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        builder.addCase(addCard.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(addCard.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.data[action.payload.idList] === undefined ? state.data[action.payload.idList] = [action.payload.data] : state.data[action.payload.idList] = [...state.data[action.payload.idList], action.payload.data];
                state.data[action.payload.idList] = removeDuplicates(state.data[action.payload.idList]);
            }
            state.error = '';
        })
        builder.addCase(addCard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(deleteCard.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        })
        builder.addCase(deleteCard.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.data[action.payload.idList] = state.data[action.payload.idList].filter((card) => { return card.id !== action.payload.cardId })
            }
            state.error = '';
        })
        builder.addCase(deleteCard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

    }
})

export default listCardsSlice.reducer;