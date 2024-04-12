import { Item as ItemType } from "../types/Item";
import { Client as ClientType } from "../types/client"; 

export type Commande = {
    number: number;
    _id: string;
    date: string;
    status: string;
    client: ClientType;
    items: [ItemType];
}