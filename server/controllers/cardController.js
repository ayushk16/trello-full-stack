import { db } from '../app/models/index.js';
// import controllers from './index.js';

const cardModel = db.card;
const listModel = db.list;
const checkListModel = db.checkList;
const checkItemModel = db.checkItem;

export const getCard = async (req, res, next) => {
    const cardId = req.params.id;

    const card = await cardModel.findOne({ where: { id: cardId } })
    if (!card) {
        const error = new Error('card not found');
        error.status = `card with id ${cardId} not found`;
        error.statusCode = 404;
        next(error);
    }
    else {
        res.status(200).json(card);
    }
}
// { data: card, message}

export const getCards = async (req, res, next) => {
    const listId = req.params.id;
    const list = await listModel.findOne({ where: { id: listId } });
    if (!list) {
        const error = new Error('list not found');
        error.status = `list with id ${listId} not found`;
        error.statusCode = 404;
        next(error);
    }
    else {
        const cards = await cardModel.findAll({ where: { idList: listId } });
        if (!cards) {
            res.status(200).json([]);
        }
        else {
            res.status(200).json(cards);
        }
    }
}

export const addCard = async (req, res, next) => {

    const cardName = req.query.name;
    const listId = req.query.idList;
    const listData = await listModel.findOne({ where: { id: listId } });
    if (!listData) {
        const error = new Error('list not found');
        error.status = `list with id ${listId} not found`;
        error.statusCode = 404;
        next(error);
    }
    else {
        const idBoard = listData.idBoard;
        const newCardData = {
            name: cardName,
            idList: listId,
            idBoard: idBoard,
        }
        const resCard = await cardModel.create(newCardData);
        res.status(200).json(resCard);
    }
}

export const deleteCard = async (req, res, next) => {
    const cardId = req.params.id;
    const isCard = await cardModel.findOne({ where: { id: cardId } });
    if (!isCard) {
        res.status(404).json({ message: 'card not found' });
    }
    else {
        const checkLists = await checkListModel.findAll({ where: { idCard: cardId } });
        const checkListsIds = checkLists.map(checkList => checkList.id);

        const deletedCard = await cardModel.destroy({ where: { id: cardId } })
        const deletedCheckLists = await checkListModel.destroy({ where: { idCard: cardId } })
        res.status(200).json(isCard);
    }
}

