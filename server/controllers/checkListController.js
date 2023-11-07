import { db } from '../app/models/index.js';

const checkListModel = db.checkList;
const cardModel = db.card;
const checkItemModel = db.checkItem;

export const getCheckLists = async (req, res, next) => {
    const cardId = req.params.id;
    try {
        const card = await cardModel.findOne({ where: { id: cardId } });
        console.log('cards', card);
        if (!card) {
            const error = new Error('card not found');
            error.status = `card with id ${cardId} not found`;
            error.statusCode = 404;
            throw (error);
        } else {
            let checkListsData = [];
            const checkLists = await checkListModel.findAll({ where: { idCard: cardId } });
            if (!checkLists) {
                res.status(200).json([]);
            } else {
                const checkListData = await checkListModel.findAll(
                    {
                        where: { idCard: cardId },
                        include: [
                            {
                                model: checkItemModel,
                                as: 'checkItems',
                            }
                        ]
                    }
                );
                checkListData.forEach(checkList => {
                    checkListsData.push({
                        id: checkList.id,
                        name: checkList.name,
                        idCard: checkList.idCard,
                        idBoard: checkList.idBoard,
                        checkItems: checkList.checkItems,
                    })
                })
                res.status(200).json(checkListsData);
            }
        }
    } catch (error) {
        const Error = error;
        Error.status = `checkLists cant be fetched` || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);
    }

}

export const addCheckList = async (req, res, next) => {
    const name = req.query.name;
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
            const boardId = isCard.idBoard;
            const newCheckList = {
                name: name,
                idCard: cardId,
                idBoard: boardId,
            };
            const resCheckList = await checkListModel.create(newCheckList);
            const retunCheckList = {
                id: resCheckList.id,
                name: resCheckList.name,
                idCard: resCheckList.idCard,
                idBoard: resCheckList.idBoard,
                checkItems: [],
            }
            res.status(200).json(retunCheckList);
        }
    } catch (error) {
        const Error = error;
        Error.status = `checkList cant be added` || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);
    }
}

export const deleteCheckList = async (req, res, next) => {
    const checkListId = req.params.id;
    try {
        const checkList = await checkListModel.findOne({ where: { id: checkListId } });

        if (!checkList) {
            const error = new Error('checklist not found');
            error.status = `checklist with id ${checkListId} not found`;
            error.statusCode = 404;
            throw (error);
        } else {
            const deletedChecklist = await checkListModel.destroy({ where: { id: checkListId } });
            res.status(200).json(checkList);
        }
    } catch (error) {
        const Error = error;
        Error.status = `checkList cant be deleted` || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);
    }
}

