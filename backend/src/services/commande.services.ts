import { Types } from "mongoose";
import { IOrder, IClient,IItem, ClientModel, ItemModel, OrderModel } from "../models/orders";


//item model
const getItems = async ()=> {
    return await ItemModel.find();
};
const getItem = async(id: string)=>{
    return await ItemModel.findById({_id: new Types.ObjectId(id)});
}

const addItem = async(itemWhoAdd: IItem)=>{
    try{
        const newItem = new ItemModel(itemWhoAdd);
        await newItem.save();
        return newItem;
    }catch(error){
        console.log(error);
    }
}


const updateItem = async(id: string, itemWhoUpdate: IItem)=>{
    try{
        await ItemModel.updateOne(
            {_id: new Types.ObjectId(id)},
            itemWhoUpdate
        )
        return await getItem(id);
    }catch(error){
        console.log(error);
    }
}

const deleteItem = async(id: string)=>{
    try{
        await ItemModel.deleteOne({_id: new Types.ObjectId(id)});
        return await getItem(id);
    }catch(error){
        console.log(error);
    }
}






//client model
const getCleints = async()=>{
    return await ClientModel.find();
};
const getCleint = async(id: string)=>{
    return await ClientModel.find({_id: new Types.ObjectId(id)});
};
const addClient = async(clientWhoAdd: IClient)=>{
    
    try{
        const newClient = new ClientModel(clientWhoAdd);
        await newClient.save();
        return newClient;
    }catch(error){
        console.log(error);
    }
    
};


//order model

const getOrders = async()=>{
    return await OrderModel.find();
};
const getOrder = async(id: string)=>{
    return await OrderModel.findById({_id: new Types.ObjectId(id)});
};
const addOrder = async(orderWhoAdd: IOrder)=>{
    try{
        const newOrder = new OrderModel(orderWhoAdd);
        await newOrder.save();
        return newOrder;
    }catch(error){
        console.log(error);
    }
};

const updateOrder = async(id: string, orderWhoUpdate: IOrder)=>{
    try{
        await OrderModel.updateOne(
            {_id: new Types.ObjectId(id)},
            orderWhoUpdate
        )
        return await getOrder(id);
    }catch(error){
        console.log(error);
    }
};

const deleteOrder = async(id: string)=>{
    try{
        await OrderModel.deleteOne({_id: new Types.ObjectId(id)});
        return await getOrder(id);
    }catch(error){
        console.log(error);
    }
};


export{
    getItems,
    getItem,
    addItem,
    updateItem,
    deleteItem,
    getCleints,
    getCleint,
    addClient,
    getOrders,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder,
}

