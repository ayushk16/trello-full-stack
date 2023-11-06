import { configureStore } from "@reduxjs/toolkit";

import boardsReducer from '../features/boards/boardsSlice.js';
import boardReducer from '../features/boards/boardSlice.js';
import listReducer from '../features/lists/listsSlice.js';
import listCardsReducer from '../features/lists/listCardsSlice.js';
import cardDetailReducer from '../features/cards/cardDetailSlice.js';
import checkListsReducer from '../features/checkLists/checkListsSlice.js';

const store = configureStore({
    reducer: {
        boards: boardsReducer,
        board: boardReducer,
        lists: listReducer,
        listCards: listCardsReducer,
        cardDetail: cardDetailReducer,
        checkLists: checkListsReducer,
    }
})

export default store;