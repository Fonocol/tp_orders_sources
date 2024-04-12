import * as CommandService from "../services/commande.services";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
*/

export const getItems = async(req:any, res:any)=>{
    const items = await CommandService.getItems();
    return res.status(200).json(items);
};

export const getItem = async(req:any, res:any)=>{
    const {id} = req.params;
    const item = await CommandService.getItem(id);
    return res.status(200).json(item);
};

export const addItem = async(req:any, res:any)=>{
    const item = req.body;
    const newItem = await CommandService.addItem(item);
    return res.status(200).json(newItem);
};

export const updateItem = async(req:any, res:any)=>{
    const {id} = req.params;
    const item = req.body;
    const updatedItem = await CommandService.updateItem(id, item);
    return res.status(200).json(updatedItem);
}

export const deleteItem = async(req:any, res:any)=>{
    const {id} = req.params;
    const deletedItem = await CommandService.deleteItem(id);
    return res.status(200).json(deletedItem);
}

/**
 * 
 * @param req 
 * @param res 
 * @returns 
*/

export const getOrders = async(req: any, res:any)=>{
    const orders = await CommandService.getOrders();
    return res.status(200).json(orders);
};

export const getOrder = async(req:any , res:any)=>{
    const {id} = req.param;
    const order = await CommandService.getOrder(id);
    return req.status(200).json(order);
}

export const addOrder = async(req:any, res:any)=>{
    const order = req.body;
    const newOrder = await CommandService.addOrder(order);
    return res.status(200).json(newOrder);
};

export const updateOrder = async(req: any, res:any)=>{
    const {id} = req.params;
    const order = req.body;
    const updateOrder = await CommandService.updateOrder(id,order);
    return res.status(200).json(updateOrder);
};

export const deleteOrder = async(req:any, res:any)=>{
    const {id} = req.params;
    try{
        const deleteOrder = await CommandService.deleteOrder(id);
        return res.status(200).json(deleteOrder);

    }catch(error){
        console.log(error);
    }
}