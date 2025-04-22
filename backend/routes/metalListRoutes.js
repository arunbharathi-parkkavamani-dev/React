import express from 'express';
import {
    getAllMetalLists,
    getMetalListByID,
    createMetalList,
    updateMetalList,
    deleteMetalList
} from '../controllers/metalListController.js'

const router = express.Router();

router.get('/', getAllMetalLists);
router.get('/', getMetalListByID);
router.get('/', createMetalList);
router.get('/', updateMetalList);
router.get('/', deleteMetalList);

export default router