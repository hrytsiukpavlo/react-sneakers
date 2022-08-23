import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import AppContext from "./context";

function App() {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [cartOpened, setCartOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const cartResponse = await axios.get("https://62ffb7f29350a1e548e514fe.mockapi.io/cart");
			const favoritesResponse = await axios.get(
				"https://62ffb7f29350a1e548e514fe.mockapi.io/favorites"
			);
			const itemsResponse = await axios.get("https://62ffb7f29350a1e548e514fe.mockapi.io/items");

			setIsLoading(false);
			setCartItems(cartResponse.data);
			setFavorites(favoritesResponse.data);
			setItems(itemsResponse.data);
		}

		fetchData();
	}, []);

	const onAddToCart = (obj) => {
		try {
			if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
				axios.delete(`https://62ffb7f29350a1e548e514fe.mockapi.io/cart/${obj.id}`);
				setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
			} else {
				axios.post("https://62ffb7f29350a1e548e514fe.mockapi.io/cart", obj);
				setCartItems((prev) => [...prev, obj]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onRemoveItem = (id) => {
		axios.delete(`https://62ffb7f29350a1e548e514fe.mockapi.io/cart/${id}`);
		setCartItems((prev) => prev.filter((item) => item.id !== id));
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
		return cartItems.some((obj) => Number(obj.id) === Number(id));
	};

	return (
		<AppContext.Provider
			value={{
				items,
				cartItems,
				favorites,
				isItemAdded,
				onAddToFavorite,
				setCartOpened,
				setCartItems,
			}}
		>
			<div className="wrapper clear">
				{cartOpened && (
					<Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
				)}
				<Header onClickCart={() => setCartOpened(true)} />

				<Routes>
					<Route
						exact
						path="/"
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
				</Routes>

				<Routes>
					<Route path="/favorites" element={<Favorites />}></Route>
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
