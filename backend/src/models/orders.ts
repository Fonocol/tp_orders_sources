import { model, Schema, Model, Document } from "mongoose";

const clientSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        //required: true
    },
    phone: {
        type: String,
        //required: true
    },
    address: {
        type: String,
        //required: true
    },
    city: {
        type: String,
        //required: true
    },
    state: {
        type: String,
        required: true,
        default: "current"
    }
});

const itemsSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "default.jpg" // Valeur par défaut pour l'image
    },
    quantity: {
        type: Number,
        default: 0 // Valeur par défaut pour la quantité
    }
})


const ordersSchema: Schema = new Schema({
    number: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "done"
    },
    client: clientSchema,
    items: [itemsSchema]
});


export interface IClient extends Document {
    name: string;
    firstName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
}

export interface IItem extends Document {
    name: string;
    price: number;
    description: string;
    image?: string;
    quantity: number;
}

export interface IOrder extends Document {
    number: number;
    date: Date;
    status: string;
    client: IClient;
    items: IItem[];
}

export const ClientModel: Model<IClient> = model<IClient>("Client", clientSchema);
export const ItemModel: Model<IItem> = model<IItem>("Item", itemsSchema);
export const OrderModel: Model<IOrder> = model<IOrder>("Order", ordersSchema);
