import React from "react";
import CartRemoveItemIcon from "./CartRemoveItemIcon/CartRemoveItemIcon";

const CartItem = (props) => {
	return (
		<div className="cartItem">
				<img className="cartProductImg" src={props.Img} alt="foto" />
				<p className="cartProductName">{props.name}</p>
				<span className="cartCant">{props.quantity}</span>
				<span className="cartCant">${props.price} </span>
                <span className="cartCant">${props.price * props.quantity}</span>
				<button
					className="cartCantBtn removeItem"
					onClick={() => {
						props.removeItem(props.id);
					}}
				>
					<CartRemoveItemIcon />
				</button>
		</div>
	);
};

export default CartItem;
