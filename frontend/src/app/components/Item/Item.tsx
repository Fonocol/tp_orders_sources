import { Item as ItemType } from "../../types/Item";
import { useState } from "react";
import { Button, Space, Input, Image } from "antd";
import { Divider } from "antd";
import { CloseCircleOutlined,EditOutlined, DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { constants } from "fs/promises";

type ItemProps = {
    item: ItemType;
    addToSelectedItems: (newItem: ItemType) => void;
};

type selectItemProps = {
    item: ItemType;
    removeToSelectedItems: (id: string)=> void;
};



export const Item = ({ item ,addToSelectedItems}: ItemProps) => {

    //const [selectItems, setSelectItems] = useState<ItemType[]>([]);

    /*const addChariot = (newItem: ItemType) => {
        setSelectItems([...selectItems, newItem]); // Ajoute le nouvel article à la liste des commandes
    };*/

    

    return (
        <div key={item._id} className = "item-bloc">
            
                <div className = ".item-image">
                    <Image src={`/img/${item.image}`} alt=""/>
                </div>
                <Divider/>
                <div className="item-detail">
                    <div><h3>{item.name}</h3></div>
                    <div>{item.description}</div>
                    <div className="warning">{item.price}$</div>
                    <Button
                        color="blue"
                        type="primary"
                        onClick={() => addToSelectedItems(item)}
                    >Add Pizzas</Button>
                </div>   
        </div>
    );
};



export const ItemInCommande = ({item,removeToSelectedItems}: selectItemProps)=>{

    const [quantity, setQuantity] = useState<number>(1);

    const addQuantity = () => {
        setQuantity(quantity + 1);
    };

    const removeQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const totalPrice = (item.price * quantity).toFixed(2); // Garantit que le prix total a toujours 2 chiffres après la virgule

    return (
        <div className="item-commande">
            <div className="item-image">
                <Image src={`/img/${item.image}`} alt="" width={100} />
            </div>
            <div className="item-info">
                <div className="item-name">{item.name}</div>
                <div className="item-price">{totalPrice}$</div>
                <div><i>{item.description}</i></div>
            </div>
            <div className="quantity-control">
                <Button type="primary" shape="circle" icon={<MinusOutlined />} onClick={removeQuantity} />
                <Input value={quantity} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(+e.target.value)} style={{ width: 50, textAlign: "center" }} />
                <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={addQuantity} />
            </div>
            <div className="cancel-button">
                <Button type="text" icon={<CloseCircleOutlined />} onClick={() =>removeToSelectedItems(item._id)} />
            </div>
        </div>
    );
};



    /*return(
        <Space className = "item-commande">
                <div>
                    <Image src={`/img/${item.image}`} alt="" width={100} />
                    <div>{item.name}</div>
                    <div className="warning">{item.price*quantity}</div>
                    <Button
                        type="primary"
                        icon={<DeleteOutlined />}
                        danger = {true}
                        onClick={() =>removeToSelectedItems(item._id)}// Add logic for deleting item
                    />
                </div>
                <div>
                    <Button
                        type="primary"
                        icon={<MinusOutlined />}
                        onClick={removeQuantity}
                    />
                    <Input
                        value={quantity}
                        onChange={(e: any) => setQuantity(e.target.value)}
                        style={{ height: 25,width: 50,textAlign: "center" }} // height: 50,width: 50,
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={addQuantity}
                    />
                    
                </div>
     </Space>
    )
    }*/




/**
 * <Space>
                <div>
                    <Image src={`/img/${item.image}`} alt="" width={100} />
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                </div>
                <div>
                    <Button
                        type="primary"
                        icon={<MinusOutlined />}
                        onClick={removeQuantity}
                    />
                    <Input
                        value={quantity}
                        onChange={(e: any) => setQuantity(e.target.value)}
                        style={{ width: 50, textAlign: "center" }}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={addQuantity}
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        // Add logic for editing item
                    />
                    <Button
                        type="primary"
                        icon={<DeleteOutlined />}
                        // Add logic for deleting item
                    />
                </div>
     </Space>
 */