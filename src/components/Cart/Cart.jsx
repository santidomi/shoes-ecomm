import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import CartItem from "./cartItem";
import {
	collection,
	doc,
	increment,
	serverTimestamp,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { useState } from "react";

const Cart = () => {
	const cart = useContext(CartContext);
	const [buyerData, setBuyerData] = useState({
		name: "",
		email: "",
		tel: "",
	});
	const [validData, setValidData] = useState(false);

	const createOrder = () => {
		if (validData) {
			let ItemsForDb = cart.cartList.map((item) => {
				return {
					id: item.id,
					title: item.name,
					price: item.price,
					quantity: item.quantity,
				};
			});

			let order = {
				buyer: {
					name: buyerData.name,
					email: buyerData.email,
					phone: buyerData.tel,
				},

				date: serverTimestamp(),
				items: ItemsForDb,
				total: cart.TotalPrice,
			};

			createOrderInFirestore(order)
				.then((res) => {
					alert(`
					${buyerData.name}, su orden ha sido creada correctamente, 
					Bajo el identificador ${res.id}`);
					cart.cartList.forEach(async (item) => {
						const itemRef = doc(db, "items", item.id);
						await updateDoc(itemRef, {
							stock: increment(-item.quantity),
						});
					});
					cart.clear();
				})
				.catch((err) => console.error(err));
		} else {
			alert(
				"No ha sido posible crear su orden, por favor asegurese de llenar los datos"
			);
		}
	};

	const createOrderInFirestore = async (order) => {
		const newOrderRef = doc(collection(db, "orders"));
		await setDoc(newOrderRef, order);
		return newOrderRef;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setBuyerData((prevData) => {
			return {
				...prevData,
				[name]: value,
			};
		});
	};

	const handleCompleted = () => {
		if (
			buyerData.name.length > 5 &&
			buyerData.email.includes("@") &&
			buyerData.email.includes(".com") &&
			buyerData.tel.length > 7
		) {
			alert("Ya podes seguir con tu compra");
			setValidData(true);
			document.getElementById("checkoutForm").reset();
		} else {
			alert("Los datos ingresados no son validos");
		}
	};

	const cartElements = cart.cartList.map((el) => {
		return (
			<div key={el.id}>
				<CartItem
					id={el.id}
					Img={el.Img}
					name={el.name}
					quantity={el.quantity}
					price={el.price}
					removeItem={cart.removeItem}
				/>
				<hr className="cartLines" />
			</div>
		);
	});

	return (
		<div className="cartSection">
			<div className="cartContainer">
				<div className="cartTitlesContainer">
					<h4 className="cartTitles">Producto</h4>
					<h4 className="cartTitles">Cantidad</h4>
					<h4 className="cartTitles">C/U</h4>
					<h4 className="cartTitles">Total</h4>
				</div>

				{cart.cartList.length > 0 ? (
					cartElements
				) : (
					<div className="emptyCartContainer">
						<h1 className="cartTitle">El carrito esta vacio</h1>
						<Link to="/">
							<button className="goBackBtn">Compremos!</button>
						</Link>
					</div>
				)}

				{cart.cartList.length > 0 && (
					<>
						<div className="cartBtnSection">
							<button className="buyBtn" onClick={cart.clear}>
								Vaciar
							</button>
							<div className="totalSection">
								<span className="cartCant">
									Total: ${cart.TotalPrice}
								</span>
								<button
									className="buyBtn"
									onClick={createOrder}
								>
									Comprar
								</button>
							</div>
						</div>
						<div className="buyFormContainer">
							<h2 className="checkoutTitle">
								Completá este formulario antes de realizar tu
								compra
							</h2>
							<form
								action=""
								className="checkoutForm"
								id="checkoutForm"
							>
								<input
									name="name"
									type="text"
									placeholder="Nombre Apellido"
									required
									onChange={handleChange}
								/>
								<input
									name="email"
									type="email"
									placeholder="Email"
									required
									onChange={handleChange}
								/>

								<input
									name="tel"
									type="text"
									placeholder="Telefono"
									required
									onChange={handleChange}
								/>
							</form>
							<button
								className="checkoutBtnn"
								onClick={handleCompleted}
							>
								Completado
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Cart;