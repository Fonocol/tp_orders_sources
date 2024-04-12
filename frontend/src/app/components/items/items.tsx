import {Item,ItemInCommande} from "../Item/Item";
import axios from "axios";
import { useState, useEffect, Key } from "react";

import { Item as ItemType } from "../../types/Item";
import { Client as ClientType } from "../../types/client";
import { Commande as CommandeType } from "../../types/commande";

import { Col, Divider, Row } from "antd";
import { Button, Space, Input, Image } from "antd";
//import row from "antd/es/row";


export const Items =()=>{
    const [items, setItems] = useState<ItemType[]>([]);
    const [selectedItems, setSelectedItems] = useState<{[key: string]: ItemType}>({});
    const [clientInfo, setClientInfo] = useState({
        name: "",
        firstName: "",
        email: "",
        phone: "",
        address: "",
        city: ""
    });

    useEffect(()=>{
        const loadItems = async()=> {
            const {data} = await axios.get("http://127.0.0.1:5000/pizzas");
            console.log(data);
            setItems(data);
        };
        loadItems();
    },[]);

    const dividerArray = (arr: any[], size: number)=>{
        return arr.reduce((acc,_,i)=>{
            if(i%size === 0){
                acc.push(arr.slice(i,i+size));
            }
            return acc;
        },[]);
    };


    // Fonction pour ajouter un article à la liste des commandes
    const addToSelectedItems = (newItem: ItemType) => {

        setSelectedItems(prevItems=>({
            ...prevItems,
            [newItem._id]: newItem
        }));
    };

    const removeToSelectedItems = (removeItemId: string) =>{
        setSelectedItems(prevItems=>{
           const updatedItemsSelected = {...prevItems};
           delete updatedItemsSelected[removeItemId];
           return updatedItemsSelected;
        });
    };


    //new

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClientInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const placeOrder = async () => {
        try {
            const order = {
                number:0,
                client: clientInfo,
                items: Object.values(selectedItems)
            };
            // Envoyer la commande à votre backend pour enregistrement dans la base de données
            await axios.post("http://127.0.0.1:5000/commandes", order);
            // Réinitialiser les sélections et les informations client après avoir passé la commande
            setSelectedItems({});
            setClientInfo({
                name: "",
                firstName: "",
                email: "",
                phone: "",
                address: "",
                city: ""
            });
            // Afficher une confirmation à l'utilisateur
            alert("Order placed successfully!");
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error placing order. Please try again later.");
        }
    };


    return (
        <div className="menu">

            <div className="menu-title"><h2> Commande</h2></div>
            
            <div className="client-form">
                
                <label > Nom : </label>
                <Input placeholder="Nom" name="name" value={clientInfo.name} onChange={handleInputChange} /> <br/>
                <label > Prénom : </label>
                <Input placeholder="Prénom" name="firstName" value={clientInfo.firstName} onChange={handleInputChange} /><br/>
                <label > Email : </label>
                <Input placeholder="Email" name="email" value={clientInfo.email} onChange={handleInputChange} /><br/>
                <label > Téléphone : </label>
                <Input placeholder="Téléphone" name="phone" value={clientInfo.phone} onChange={handleInputChange} /><br/>
                <label > Adresse : </label>
                <Input placeholder="Adresse" name="address" value={clientInfo.address} onChange={handleInputChange} /><br/>
                <label > Ville : </label>
                <Input placeholder="Ville" name="city" value={clientInfo.city} onChange={handleInputChange} /><br/>
                <Button type="primary" onClick={placeOrder}>Passer la commande</Button>
            </div>
            <Divider />
            <div className="selected-items">
            <div className="menu-title"><h2> Liste des commandes</h2></div>
                {Object.entries(selectedItems).map(([selectedId, selected]) => (
                    <ItemInCommande
                        key={selectedId}
                        item={selected}
                        removeToSelectedItems={removeToSelectedItems}
                    />
                ))}
            </div>


            <Divider />

            <div className="menu-title"><h2> MENU</h2></div>
                
            <div className = "item-grid">
            {items.length > 0 ? dividerArray(items,3).map((row: any[],index: Key | null | undefined)=>(
                <Row key={index} gutter = {[16,16]}>
                    {( row.map((item) =>(
                        <Item
                            key={item._id}
                            item = {item}
                            addToSelectedItems={addToSelectedItems}
                        />
                    )) 
                    )}
                </Row>
                
            )) : (
                <div> Pizzas not find</div>
            )}

            </div>

        </div>
    );

}










    /*return (
        <>

            <div className="menu">

            <div className="menu-title"><h2> COMMANDE</h2></div>
            <div className="commande-area">

            <Button
                color="blue"
                type="primary"
                //onClick   creat commande to db
            >Add Commande</Button>
            <div className="command-selected">
            {Object.entries(selectedItems).length > 0 ? Object.entries(selectedItems).map(([selectedId,selected])=>(

                <ItemInCommande
                    key={selectedId}
                    item = {selected}
                    removeToSelectedItems={removeToSelectedItems}
                />
            )) : (
                <div> Please Select Your Pizzas</div>
            )}
            </div>

            </div>
            <Divider/>


            <div className="menu-title"><h2> MENU</h2></div>
                
            <div className = "item-grid">
            {items.length > 0 ? dividerArray(items,3).map((row: any[],index: Key | null | undefined)=>(
                <Row key={index} gutter = {[16,16]}>
                    {( row.map((item) =>(
                        <Item
                            key={item._id}
                            item = {item}
                            addToSelectedItems={addToSelectedItems}
                        />
                    )) 
                    )}
                </Row>
                
            )) : (
                <div> Pizzas not find</div>
            )}

            </div>

            </div>

            
        </>
    );    
}



/**
 *  return (
        <>
            <div className="menu">
                <div className="menu-title"><h2> MENU</h2></div>
                <div className="item-gril">
                {items.length > 0 ? ( items.map((item) =>(
                    <Item
                        key={item._id}
                        item = {item}
                    />
                )) 
                ) : (
                    <div> Pizzas not find</div>
                )}
                </div>
            </div>
        </>
    );
 */

/**
 * return (
        <>

            <div className="menu">
            <div className="menu-title"><h2> MENU</h2></div>
                
            </div>
            {dividerArray(items,3).map(row,index)=>(
                <Row key={index} gutter = {[16,16]}>
                    {items.length > 0 ? ( items.map((item) =>(
                        <Item
                            key={item._id}
                            item = {item}
                        />
                    )) 
                    ) : (
                        <div> Pizzas not find</div>
                    )}
                </Row>
                
            )}
        </>
    );
*/