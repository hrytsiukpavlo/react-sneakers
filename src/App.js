import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [cartOpened, setCartOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
					axios.get("https://62ffb7f29350a1e548e514fe.mockapi.io/cart"),
					axios.get("https://62ffb7f29350a1e548e514fe.mockapi.io/favorites"),
					axios.get("https://62ffb7f29350a1e548e514fe.mockapi.io/items"),
				]);

				setIsLoading(false);
				setCartItems(cartResponse.data);
				setFavorites(favoritesResponse.data);
				setItems(itemsResponse.data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, []);

	const onAddToCart = async (obj) => {
		try {
			const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
			if (findItem) {
				await axios.delete(`https://62ffb7f29350a1e548e514fe.mockapi.io/cart/${findItem.id}`);
				setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
			} else {
				const { data } = await axios.post("https://62ffb7f29350a1e548e514fe.mockapi.io/cart", obj);
				setCartItems((prev) => [...prev, data]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onRemoveItem = (id) => {
		try {
			axios.delete(`https://62ffb7f29350a1e548e514fe.mockapi.io/cart/${id}`);
			setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
		} catch (error) {
			console.log(error);
		}
	};

	const onAddToFavorite = async (obj) => {
		try {
			if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
				axios.delete(`https://62ffb7f29350a1e548e514fe.mockapi.io/favorites/${obj.id}`);
				setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
			} else {
				const { data } = await axios.post(
					"https://62ffb7f29350a1e548e514fe.mockapi.io/favorites",
					obj
				);
				setFavorites((prev) => [...prev, data]);
			}
		} catch (e) {
			console.log("Cannot add to favorite");
		}
	};

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id));
	};

	return (
		<AppContext.Provider
			value={{
				items,
				cartItems,
				favorites,
				isItemAdded,
				onAddToFavorite,
				onAddToCart,
				setCartOpened,
				setCartItems,
			}}
		>
			<div className="wrapper clear">
				<Drawer
					items={cartItems}
					onClose={() => setCartOpened(false)}
					onRemove={onRemoveItem}
					opened={cartOpened}
				/>
				<Header onClickCart={() => setCartOpened(true)} />

				<Routes>
					<Route
						exact
						path={process.env.PUBLIC_URL + "/"}
						element={
							<Home
								items={items}
								cartItems={cartItems}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								onChangeSearchInput={onChangeSearchInput}
								onAddToFavorite={onAddToFavorite}
								onAddToCart={onAddToCart}
								isLoading={isLoading}
							/>
						}
					></Route>
					<Route exact path={process.env.PUBLIC_URL + "/favorites"} element={<Favorites />}></Route>
					<Route exact path={process.env.PUBLIC_URL + "/orders"} element={<Orders />}></Route>
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
