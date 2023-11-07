import { db } from '../app/models/index.js';

const boardModel = db.board;

const bgImages = [
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/d4cf3718cc79bc4621e2f2028de6d960/photo-1696837412004-cb6580ab1cc3',
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/1a2895ce7d5cae7b6ff8995cce267960/photo-1696628372469-2d86787f348b',
    '',
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/f2d41b40980f4180bd6e3aa6c73fe83c/photo-1694984121999-36d30b67f391',
    'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/peach.svg',
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/52b1253ebbe49192297040f33dded421/photo-1696595883516-76c97aa3a164',
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/11ce93d85cfbb591d37c1fb64c2b94df/photo-1695056721201-078a656ef90b',

];
const bgColors = [
    '#CD5A91',
    '',
    '#EF763A',
]

export const getBoard = async (req, res, next) => {
    const boardId = req.params.id;
    try {
        let board = await boardModel.findOne({ where: { id: boardId } });
        if (!board) {
            const error = new Error('board not found');
            error.status = `board with id ${boardId} not found`;
            error.statusCode = 404;
            throw (error);
        }
        else {
            const boardData = {
                id: board.id,
                name: board.name,
                prefs: {
                    backgroundImage: board.backgroundImage,
                    backgroundColor: board.backgroundColor,

                }
            }
            res.status(200).json(boardData);
        }
    } catch (error) {
        const Error = error;
        Error.status = `board with id ${boardId} not found` || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);
    }
}

export const getBoards = async (req, res) => {
    try {
        let boards = await boardModel.findAll();
        if (!boards) {
            boards = [];
            res.status(200).json(boards);
        }
        else {
            const boardsData = [];
            boards.forEach(boardData => {
                boardsData.push({
                    id: boardData.id,
                    name: boardData.name,
                    prefs: {
                        backgroundImage: boardData.backgroundImage,
                        backgroundColor: boardData.backgroundColor,

                    }
                })
            })
            res.status(200).json(boardsData);
        }
    } catch (error) {
        const Error = error;
        Error.status = 'boards not found' || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);
    }

}

export const addBoard = async (req, res) => {
    try {
        const newBoard = {
            name: req.query.name,
            backgroundImage: bgImages[Math.floor(Math.random() * bgImages.length)],
            backgroundColor: bgColors[Math.floor(Math.random() * bgColors.length)],
        }
        const resBoard = await boardModel.create(newBoard);
        res.json(resBoard);
    } catch (error) {
        const Error = error;
        Error.status = 'board not created' || error.status;
        Error.statusCode = 500 || error.statusCode;
        next(Error);
    }
}