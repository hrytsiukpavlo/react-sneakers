function Drawer() {
	return (
		<div style={{ display: "none" }} className="overlay">
			<div className="drawer">
				<h2 className="mb-30 d-flex justify-between">
					Cart <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove icon" />
				</h2>

				<div className="items">
					<div className="cartItem d-flex align-center justify-center mb-20">
						<div
							style={{ backgroundImage: "url(/img/sneakers/1.jpg)" }}
							className="cartItemImg"
						></div>
						<div className="mr-20 flex">
							<p className="mb-5">Nike Air Max</p>
							<b>85$</b>
						</div>
						<img className="removeBtn" src="/img/btn-remove.svg" alt="Remove icon" />
					</div>
					<div className="cartItem d-flex align-center justify-center mb-20">
						<div
							style={{ backgroundImage: "url(/img/sneakers/1.jpg)" }}
							className="cartItemImg"
						></div>
						<div className="mr-20 flex">
							<p className="mb-5">Nike Air Max</p>
							<b>85$</b>
						</div>
						<img className="removeBtn" src="/img/btn-remove.svg" alt="Remove icon" />
					</div>
					<div className="cartItem d-flex align-center justify-center mb-20">
						<div
							style={{ backgroundImage: "url(/img/sneakers/1.jpg)" }}
							className="cartItemImg"
						></div>
						<div className="mr-20 flex">
							<p className="mb-5">Nike Air Max</p>
							<b>85$</b>
						</div>
						<img className="removeBtn" src="/img/btn-remove.svg" alt="Remove icon" />
					</div>
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
					<button className="greenButton">
						Complete order <img src="/img/arrow.svg" alt="Arrow" />{" "}
					</button>
				</div>
			</div>
		</div>
	);
}

export default Drawer;
