import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import AppContext from "../context";
import { Link } from "react-router-dom";

export default function Orders() {
	const { onAddToFavorite, onAddToCart } = useContext(AppContext);
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get("https://62ffb7f29350a1e548e514fe.mockapi.io/orders");
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>My orders</h1>
			</div>

			<div className="d-flex flex-wrap">
				{isLoading ? (
					[...Array(8)]
				) : orders.length > 0 ? (
					orders.map((item, index) => <Card key={index} loading={isLoading} {...item} />)
				) : (
					<div className="emptyFavorites">
						<img src="img/sad.png" alt="Sad emoji" />
						<h2>No orders</h2>
						<p>Place at least one order</p>

						<Link to={process.env.PUBLIC_URL + "/"} className="linkElement">
							<button className="greenButton">
								<img src="img/arrow.svg" alt="Arrow" />
								Go back
							</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
