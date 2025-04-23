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
router.get('/:id', getMetalListByID);
router.post('/', createMetalList);
router.put('/:id', updateMetalList);
router.delete('/:id', deleteMetalList);

export default router