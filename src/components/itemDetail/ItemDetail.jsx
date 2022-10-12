import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import ItemCount from "../ItemCount";

const ItemDetail = ({ item }) => {
    const test = useContext(CartContext);
    const [itemCount, setItemCount] = useState(1);
    const [itemStock, setItemStock] = useState(1);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        setItemCount(item.quantity);
        setItemStock(item.stock);
    }, [item]);

    const onAdd = (stock, count) => {
        alert(
            `Has agregado ${
                count > 1 ? `${count} productos` : `${count} producto`
            } al carrito`
        );
        setItemStock(stock - count);
        setAdded(true);
        test.addItem(item, count);
    };

    return (

        
        <div className="productSection" style={{display: 'flex', justifyContent: 'center',maxWidth: "100%"}}>
            <div className="imgContainer">
                <img className="individualImg" src={item.Img} alt="" />
            </div>

            <div className="infoContainer">
            <h2 className="productTitle">{item.name}</h2>
            <p className="productPrice">${item.price}</p>
            <p className="productDescription">{item.desc}</p>
            <div className="paymentSection ">
            <div>
                <div className="addToCartSection">
                {added === false ? (
                    <ItemCount
                    Stock={itemStock}
                    initial={itemCount}
                    onAdd={onAdd}
                    />
                ) : (
                    <Link to="/cart" className="checkoutBtn noUnderline">
                    Finalizar compra
                    </Link>
                )}
                </div>
                <div>
                <p className="itemDescription">Disponibles: {itemStock}</p>
                </div>
            </div>
            </div>
        </div>
        </div>
   
    );
};
export default ItemDetail;