import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
	const [cartList, setCartList] = useState([]);

	const isOnCart = (itemId) => {
		const item = cartList.find((el) => el.id === itemId);
		return item ? true : false;
	};

	const addItem = (item, qty) => {
		if (isOnCart(item.id)) {
			setCartList((prevState) => {
				return prevState.map((el) => {
					console.log(el.stock);
					if (el.id === item.id) {
						if (el.quantity + qty > el.stock - 1) {
							alert(`Lo sentimos, el maximo disponible de ${el.stock}`)
							return {
								...el,
								quantity: el.stock,
							};
						} else {
							return {
								...el,
								quantity: el.quantity + qty,
							};
						}
					} else {
						return el;
					}
				});
			});
		} else {
			let itemForCart = {
				...item,
				quantity: qty,
			};
			setCartList((prevState) => [...prevState, itemForCart]);
		}
	};

	const removeItem = (itemId) => {
		let newCartList = cartList.filter((item) => item.id !== itemId);
		setCartList(newCartList);
	};

	const clear = () => {
		setCartList([]);
	};

	const totalPrice = () => {
		return Math.round(
			cartList.reduce(
				(totalPrice, item) => totalPrice + item.price * item.quantity,
				0
			)
		);
	};

	const TotalPrice = totalPrice();

		const countQuantity = () => {
			return Math.round(
				cartList.reduce(
					(totalItems, item) =>
						totalItems + item.quantity,
					0
				)
			);
		};

	const totalItems = countQuantity();

	return (
		<CartContext.Provider value={{ cartList, addItem, removeItem, clear, TotalPrice, totalItems }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;