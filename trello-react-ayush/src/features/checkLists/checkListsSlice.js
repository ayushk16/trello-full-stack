import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: true,
    error: '',
    data: [],
    // data: {
    //     checklist_id1: {
    //         items: {

    //         }
    //     }
    // },
};

export const fetchCheckLists = createAsyncThunk('checkLists/fetchCheckLists', ({ cardId }) => {
    return axios({
        method: "GET",
        url: `http://localhost:3000/cards/${cardId}/checklists`,
        params: {
            // key: import.meta.env.VITE_API_KEY,
            // token: import.meta.env.VITE_TOKEN
        }
    })
        .then((res) => {
            return res.data;
        })
})

export const addCheckList = createAsyncThunk('checkLists/addCheckList', ({ cardId, checkListName }) => {
    return axios({
        method: 'POST',
        url: `http://localhost:3000/cards/${cardId}/checklists`,
        params: {
            name: checkListName,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            return res.data;
        })
})


export const deleteCheckList = createAsyncThunk('checkLists/deleteCheckList', (checkListId) => {
    console.log('checkListId', checkListId)
    return axios({
        method: 'DELETE',
        url: `http://localhost:3000/checklists/${checkListId}`,
        params: {
            // key: import.meta.env.VITE_API_KEY,
            // token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            return checkListId;
        })
})


export const addCheckItem = createAsyncThunk('checkLists/addCheckItem', ({ checkListId, value }) => {
    return axios({
        method: 'POST',
        // url: `https://api.trello.com/1/checklists/${checkListId}/checkItems`,
        url: `http://localhost:3000/checklists/${checkListId}/checkitems`,
        params: {
            name: value,
            // key: import.meta.env.VITE_API_KEY,
            // token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            return { data: res.data, checkListId: checkListId };
        })
})

export const deleteCheckItem = createAsyncThunk('checkLists/deleteCheckItem', ({ checkListId, checkItemId }) => {
    console.log(checkListId, checkItemId)
    return axios({
        method: 'DELETE',
        url: `http://localhost:3000/checklists/${checkListId}/checkItems/${checkItemId}`,
        params: {
            // key: import.meta.env.VITE_API_KEY,
            // token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            return { checkItemId, checkListId };
        })
})

export const updateCheckItem = createAsyncThunk('checkLists/updateCheckItem', ({ cardId, checkListId, checkItemId, checkedStatus }) => {
    return axios({
        method: 'PUT',
        url: `http://localhost:3000/cards/${cardId}/checkItem/${checkItemId}`,
        params: {
            state: checkedStatus ? 'complete' : 'incomplete',
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            return { checkListId, checkItemId, checkedStatus };
        })
})



const checkListsSlice = createSlice({
    name: 'checkLists',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchCheckLists.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchCheckLists.fulfilled, (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.data = action.payload;
            state.error = ''
        })
        builder.addCase(fetchCheckLists.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = 'Something went while adding CHECKLIST try again.';
        })
        builder.addCase(addCheckList.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addCheckList.fulfilled, (state, action) => {
            state.loading = false;
            state.data = [...state.data, action.payload];
            state.error = ''
        })
        builder.addCase(addCheckList.rejected, (state, action) => {
            state.loading = false;
            state.data = state.data;
            state.error = 'Something went while adding CHECKLIST try again.';
        })
        builder.addCase(deleteCheckList.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteCheckList.fulfilled, (state, action) => {
            state.loading = false;
            state.data = state.data.filter((checkList) => checkList.id !== action.payload);
            state.error = ''
        })
        builder.addCase(deleteCheckList.rejected, (state, action) => {
            state.loading = false;
            state.data = state.data;
            state.error = 'Something went while deleting CHECKLIST try again.';
        })

        builder.addCase(addCheckItem.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addCheckItem.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
                const checkListIndex = state.data.findIndex((checkList) => checkList.id === action.payload.checkListId);
                checkListIndex !== -1 ? state.data[checkListIndex].checkItems.push(action.payload.data) : null;
            }
            state.error = ''
        })
        builder.addCase(addCheckItem.rejected, (state, action) => {
            state.loading = false;
            state.data = state.data;
            state.error = 'Something went while adding CHECKITEM try again.';
        })

        builder.addCase(deleteCheckItem.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteCheckItem.fulfilled, (state, action) => {
            state.loading = false;
            const checkListIndex = state.data.findIndex((checkList) => checkList.id === action.payload.checkListId);
            checkListIndex !== -1 ? state.data[checkListIndex].checkItems = state.data[checkListIndex].checkItems.filter((checkItem) => checkItem.id !== action.payload.checkItemId) : null;
            state.error = ''
        })
        builder.addCase(deleteCheckItem.rejected, (state, action) => {
            state.loading = false;
            state.data = state.data;
            state.error = 'Something went while deleting CHECKITEM try again.';
        })

        builder.addCase(updateCheckItem.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateCheckItem.fulfilled, (state, action) => {
            state.loading = false;
            const checkListIndex = state.data.findIndex((checkList) => checkList.id === action.payload.checkListId);
            const checkItemIndex = state.data[checkListIndex].checkItems.findIndex((checkItem) => checkItem.id === action.payload.checkItemId);
            state.data[checkListIndex].checkItems[checkItemIndex].state = action.payload.checkedStatus ? 'complete' : 'incomplete';
            state.error = ''
        })
        builder.addCase(updateCheckItem.rejected, (state, action) => {
            state.loading = false;
            state.data = state.data;
            state.error = 'Something went while updating CHECKITEM try again.';
        })

    }
})

export default checkListsSlice.reducer;