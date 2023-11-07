import { Router } from "express";
import controller from "../controllers/index.js";
import { db } from "../app/models/index.js";

const boardModel = db.board;

export const router = Router();

router.get('/', controller.getBoards)
router.post('/', controller.addBoard)