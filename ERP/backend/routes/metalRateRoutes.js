import express from 'express';
import {
    getAllMetalRates,
    getMetalRateById,
    createMetalRate,
    updateMetalRate,
    deleteMetalRate
} from '../controllers/metalRateController.js';

const router = express.Router();

router.get('/', getAllMetalRates);
router.get('/:id', getMetalRateById);
router.post('/', createMetalRate);
router.put('/:id', updateMetalRate);
router.delete('/:id', deleteMetalRate);

export default router;
