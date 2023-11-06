import { Router } from "express";
import controller from "../controllers/index.js";
export const router = Router();


router.get("/", controller.getBoards);
router.get("/:id", controller.getBoard);
router.post("/", controller.addBoard);
router.get('/:id/lists', controller.getLists)