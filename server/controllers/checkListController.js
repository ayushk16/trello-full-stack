import { db } from '../app/models/index.js';

const checkListModel = db.checkList;
const cardModel = db.card;
const checkItemModel = db.checkItem;

export const getCheckLists = async (req, res, next) => {
    const cardId = req.params.id;
    const card = await cardModel.findOne({ where: { id: cardId } });
    console.log('cards', card);
    if (!card) {
        const error = new Error('card not found');
        error.status = `card with id ${cardId} not found`;
        error.statusCode = 404;
        next(error);
    } else {
        let checkListsData = [];
        const checkLists = await checkListModel.findAll({ where: { idCard: cardId } });
        if (!checkLists) {
            res.status(200).json([]);
        } else {
            const checkItems = await checkItemModel.findAll();
            for (const i in checkLists) {
                let checkItemsData = [];
                // const checkItemsData = checkItems.filter(checkItem => checkItem.idCheckList === checkLists[i].id);
                for (let p = 0; p < checkItems.length; p++) {
                    if (checkItems[p].idCheckList === checkLists[i].id) {
                        checkItemsData.push(checkItems[p]);
                    }
                }
                const tempObj = {
                    id: checkLists[i].id,
                    name: checkLists[i].name,
                    idCard: checkLists[i].idCard,
                    idBoard: checkLists[i].idBoard,
                    checkItems: [...checkItemsData],
                }
                checkListsData.push(tempObj);
            }
            res.status(200).json(checkListsData);
        }
    }
}

export const addCheckList = async (req, res, next) => {
    const name = req.query.name;
    const cardId = req.params.id;

    const isCard = await cardModel.findOne({ where: { id: cardId } });
    if (!isCard) {
        const error = new Error('card not found');
        error.status = `card with id ${cardId} not found`;
        error.statusCode = 404;
        next(error);
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
            name: resCheckList.name,
            idCard: resCheckList.idCard,
            idBoard: resCheckList.idBoard,
            checkItems: [],
        }
        res.status(200).json(retunCheckList);
    }
}

export const deleteCheckList = async (req, res, next) => {
    const checkListId = req.params.id;

    // const resCheckList = {
    //     id: checkListId,
    //     name: 'checkList1',
    //     idCard: 1,
    //     idBoard: 1,
    // }
    const checkList = await checkListModel.findOne({ where: { id: checkListId } });

    if (!checkList) {
        const error = new Error('checklist not found');
        error.status = `checklist with id ${checkListId} not found`;
        error.statusCode = 404;
        next(error);
    } else {
        const deletedChecklist = await checkListModel.destroy({ where: { id: checkListId } });
        const deleteCheckItem = await checkItemModel.destroy({ where: { idCheckList: checkListId } });
        res.status(200).json(checkList);
    }
}

