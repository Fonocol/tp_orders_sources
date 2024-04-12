import express from 'express';
import {
    getOrder,
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder
} from '../controllers/commande.controllers';


const router = express.Router();

/**
 * GET Commande
 */

router.get('/',getOrders);
router.get('/:id',getOrder); 

router.post('/',addOrder);
router.put('/:id',updateOrder);
router.delete('/:id',deleteOrder);

export {router};