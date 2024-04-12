import express from 'express';
import {
    getItems,
    getItem,
    addItem,
    updateItem,
    deleteItem
} from '../controllers/commande.controllers';


const router = express.Router();

/***
 * GET Item
 */
router.get('/',getItems);
router.get('/:id',getItem); 

router.post('/',addItem);
router.put('/:id',updateItem);
router.delete('/:id',deleteItem);

export {router};
