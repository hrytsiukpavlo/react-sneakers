import Info from "./Info";
import { useState, useContext } from "react";
import AppContext from "../context";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
	const { cartItems, setCartItems } = useContext(AppContext);
	const [orderId, setOrderId] = useState(null);
	const [isorderComplete, setIsOrderComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post("https://62ffb7f29350a1e548e514fe.mockapi.io/orders", {
				items: cartItems,
			});

			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartItems([]);

			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete("https://62ffb7f29350a1e548e514fe.mockapi.io/cart/" + item.id);
				await delay(1000);
			}
		} catch (error) {
			console.log(error);
			alert("Unavailable to create order :(");
		}
		setIsLoading(false);
	};
	return (
		<div className="overlay">
			<div className="drawer">
				<h2 className="mb-30 d-flex justify-between">
					Cart{" "}
					<img
						onClick={onClose}
						className="removeBtn cu-p"
						src="/img/btn-remove.svg"
						alt="Remove icon"
					/>
				</h2>

				{items.length > 0 ? (
					<>
						<div className="items">
							{items.map((obj) => (
								<div key={obj.id} className="cartItem d-flex align-center mb-20">
									<div
										style={{ backgroundImage: `url(${obj.imageUrl})` }}
										className="cartItemImg"
									></div>

									<div className="mr-20 flex">
										<p className="mb-5">{obj.title}</p>
										<b>{obj.price}$</b>
									</div>
									<img
										onClick={() => onRemove(obj.id)}
										className="removeBtn"
										src="/img/btn-remove.svg"
										alt="Remove"
									/>
								</div>
							))}
						</div>
						<div className="cartTotalBlock">
							<ul>
								<li>
									<span>Total:</span>
									<div></div>
									<b>170$</b>
								</li>
								<li>
									<span>Tax 5%:</span>
									<div></div>
									<b>8.5$</b>
								</li>
							</ul>
							<button disabled={isLoading} onClick={onClickOrder} className="greenButton">
								Complete order <img src="/img/arrow.svg" alt="Arrow" />{" "}
							</button>
						</div>
					</>
				) : (
					<Info
						title={isorderComplete ? "Order completed!" : "Cart is empty"}
						description={
							isorderComplete
								? `You order #${orderId} will be proceed via shipping company soon`
								: "Add at least one pair of sneakers to complete order"
						}
						image={isorderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
					/>
				)}
			</div>
		</div>
	);
}

export default Drawer;
