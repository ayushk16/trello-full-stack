import { db } from '../app/models/index.js';

const listModel = db.list;
const boardModel = db.board;
const cardModel = db.card;

export const getLists = async (req, res, next) => {
    const boardId = req.params.id;
    const board = await boardModel.findOne({ where: { id: boardId } });
    if (!board) {
        const error = new Error('board not found');
        error.status = `board with id ${boardId} not found`;
        error.statusCode = 404;
        next(error);
    }
    else {
        const resLists = await listModel.findAll({ where: { idBoard: boardId } });
        if (!resLists) {
            res.status(200).json([]);
        }
        else {
            res.status(200).json(resLists);
        }
    }
}

export const archiveList = async (req, res, next) => {
    const listId = req.params.id;
    const value = req.query.value;
    if (value === 'true') {
        let isList = await listModel.findOne({ where: { id: listId } });
        if (!isList) {
            const error = new Error('list not found');
            error.status = `list with id ${listId} not found`;
            error.statusCode = 404;
            next(error);
        }
        else {
            const resData = await listModel.destroy({ where: { id: listId } });
            const resCards = await cardModel.destroy({ where: { idList: listId } });
            res.status(200).json(isList);
        }
    }
    else {
        const error = new Error('cannot archive list');
        error.status = `list with id ${listId} cannot be archived pass value=true in query params`;
        error.statusCode = 404;
        next(error);
    }
}

export const addList = async (req, res, next) => {
    const newList = {
        name: req.query.name,
        idBoard: req.query.idBoard,
    }
    const resList = await listModel.create(newList);
    res.json(resList);
}