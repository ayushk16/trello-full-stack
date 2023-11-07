import { db } from '../app/models/index.js';

const listModel = db.list;
const boardModel = db.board;

export const getLists = async (req, res, next) => {
    const boardId = req.params.id;

    try {
        const board = await boardModel.findOne({ where: { id: boardId } });
        if (!board) {
            const error = new Error('board not found');
            error.status = `board with id ${boardId} not found`;
            error.statusCode = 404;
            throw (error);
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

    } catch (error) {
        const Error = error;
        Error.status = `board with id ${boardId} not found` || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);
    }
}

export const archiveList = async (req, res, next) => {
    const listId = req.params.id;
    const value = req.query.value;
    try {
        if (value === 'true') {
            let isList = await listModel.findOne({ where: { id: listId } });
            if (!isList) {
                const error = new Error('list not found');
                error.status = `list with id ${listId} not found`;
                error.statusCode = 404;
                throw (error);
            }
            else {
                const deletedList = await listModel.destroy({ where: { id: listId } });
                res.status(200).json(isList);
            }
        }
        else {
            const error = new Error('cannot archive list');
            error.status = `list with id ${listId} cannot be archived pass value=true in query params`;
            error.statusCode = 404;
            throw (error);
        }
    } catch (error) {
        const Error = error;
        Error.status = `cannot archive list` || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);
    }
}

export const addList = async (req, res, next) => {
    try {
        const newList = {
            name: req.query.name,
            idBoard: req.query.idBoard,
        }
        const resList = await listModel.create(newList);
        res.json(resList);
    } catch (error) {
        const Error = error;
        Error.status = `cannot add list` || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);
    }
}