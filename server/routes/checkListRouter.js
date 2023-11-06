import { Router } from "express";
import controller from "../controllers/index.js";
export const router = Router();

router.delete('/:id', controller.deleteCheckList);
router.post('/:id/checkItems', controller.addCheckItem);
router.delete('/:idChecklist/checkItems/:idCheckItem', controller.deleteCheckItem);