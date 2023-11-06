import { Router } from "express";
import controller from "../controllers/index.js";
export const router = Router();


router.post('/', controller.addCard);
router.delete('/:id', controller.deleteCard);
router.get('/:id', controller.getCard);
router.get('/:id/checklists', controller.getCheckLists);
router.post('/:id/checklists', controller.addCheckList);
router.put('/:idcard/checkItem/:idcheckItem', controller.updateCheckItem);