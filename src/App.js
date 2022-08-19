import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { useState, useEffect } from "react";

function App() {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [cartOpened, setCartOpened] = useState(false);

	useEffect(() => {
		fetch("https://62ffb7f29350a1e548e514fe.mockapi.io/items")
			.then((res) => res.json())
			.then((json) => setItems(json));
	}, []);

	const onAddToCart = (obj) => {
		setCartItems((prev) => [...prev, obj]);
	};

	return (
		<div className="wrapper clear">
			{cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
			<Header onClickCart={() => setCartOpened(true)} />
			<div className="content p-40">
				<div className="d-flex align-center mb-40 justify-between">
					<h1>All sneakers</h1>
					<div className="search-block d-flex">
						<img src="/img/search.svg" alt="Search icon" />
						<input placeholder="Search..." />
					</div>
				</div>

				<div className="d-flex flex-wrap">
					{items.map((item) => (
						<Card
							title={item.title}
							price={item.price}
							imageUrl={item.imageUrl}
							onFavoriteClick={() => alert(222)}
							onPlusClick={(obj) => onAddToCart(obj)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
