import express from "express";
import bodyParser from "body-parser";
// const cors = require("cors");
import cors from 'cors';

// import dotenv from "dotenv" in next line
import dotenv from "dotenv";
dotenv.config();

import { router as apiRouter } from './routes/router.js';
import errorHandlerFunction from "./middleware/errorHandler.js";
import controller from "./controllers/index.js";
import { router as boardRouter } from './routes/boardsRouter.js';
import { router as listRouter } from './routes/listsRouter.js';
import { router as cardRouter } from './routes/cardRouter.js';
import { router as checkListRouter } from './routes/checkListRouter.js';
import { router as testRouter } from './routes/testRouter.js';
import { getBoards } from "./controllers/boardController.js";
const app = express();

const PORT = process.env.PORT || 3000;


// var corsOptions = {
//     origin: `http://localhost:${PORT}`,
//     method: ["GET, POST, PUT, DELETE"],
// };


// app.use(cors(corsOptions));

app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', controller.getBoards);
app.use("/members", controller.getBoards);
app.use("/boards", boardRouter);
app.use("/lists", listRouter);
app.use("/cards", cardRouter);
app.use("/checklists", checkListRouter);
app.use("/test", testRouter);

app.all('*', (req, res, next) => {
    const error = new Error(`can't find ${req.originalUrl} on the server.`);
    error.status = 'wrong URL';
    error.statusCode = 404;
    next(error)
})

app.use(errorHandlerFunction)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
})