import { getBoard, getBoards, addBoard } from "./boardController.js";
import { getLists, archiveList, addList } from "./listController.js";
import { getCard, getCards, addCard, deleteCard } from "./cardController.js";
import { getCheckLists, addCheckList, deleteCheckList } from "./checkListController.js";
import { addCheckItem, deleteCheckItem, updateCheckItem } from "./checkItemController.js";

export default { getBoard, getBoards, addBoard, getLists, archiveList, addList, getCard, getCards, addCard, deleteCard, getCheckLists, addCheckList, deleteCheckList, addCheckItem, deleteCheckItem, updateCheckItem };