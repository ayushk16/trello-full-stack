import { db } from '../app/models/index.js';
// import controllers from './index.js';

const cardModel = db.card;
const listModel = db.list;

export const getCard = async (req, res, next) => {
    const cardId = req.params.id;
    try {
        const card = await cardModel.findOne({ where: { id: cardId } })
        if (!card) {
            const error = new Error('card not found');
            error.status = `card with id ${cardId} not found`;
            error.statusCode = 404;
            throw (error);
        }
        else {
            res.status(200).json(card);
        }
    } catch (error) {
        const Error = error;
        Error.status = `card with id ${cardId} not found` || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);
    }
}
// { data: card, message}

export const getCards = async (req, res, next) => {
    const listId = req.params.id;
    try {
        const list = await listModel.findOne({ where: { id: listId } });
        if (!list) {
            const error = new Error('list not found');
            error.status = `list with id ${listId} not found`;
            error.statusCode = 404;
            throw (error);
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
    } catch (error) {
        const Error = error;
        Error.status = `list with id ${listId} not found` || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);
    }
}

export const addCard = async (req, res, next) => {
    const cardName = req.query.name;
    const listId = req.query.idList;
    try {
        const listData = await listModel.findOne({ where: { id: listId } });
        if (!listData) {
            const error = new Error('list not found');
            error.status = `list with id ${listId} not found`;
            error.statusCode = 404;
            throw (error);
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
    } catch (error) {
        const Error = error;
        Error.status = `list with id ${listId} not found` || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);
    }
}

export const deleteCard = async (req, res, next) => {
    const cardId = req.params.id;
    try {
        const isCard = await cardModel.findOne({ where: { id: cardId } });
        if (!isCard) {
            const error = new Error('card not found');
            error.status = `card with id ${cardId} not found`;
            error.statusCode = 404;
            throw (error);
        }
        else {
            const deletedCard = await cardModel.destroy({ where: { id: cardId } })
            res.status(200).json(isCard);
        }
    } catch (error) {

    }
}

