import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar.jsx'
import ItemListContainer from './components/ItemListContainer.jsx';
import ItemDetailContainer from './components/itemDetail/ItemDetailContainer.jsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Cart from './components/Cart/Cart.jsx';
import CartContextProvider from "./context/CartContext.jsx";



function App() {
  return (
		<CartContextProvider>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						exact
						path="/"
						element={<ItemListContainer greeting="Tienda" />}
					/>
					<Route
						exact
						path="/category/:catId"
						element={<ItemListContainer greeting="Tienda" />}
					/>
					<Route
						exact
						path="/item/:id"
						element={<ItemDetailContainer />}
					/>
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</BrowserRouter>
		</CartContextProvider>
	);
}

export default App;