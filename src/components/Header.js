import { Link } from "react-router-dom";

function Header(props) {
	return (
		<header className="d-flex justify-between align-center p-40">
			<Link to="/">
				<div className="d-flex align-center">
					<img width={40} height={40} src="/img/logo.png" alt="Shop's logo" />
					<div>
						<h3 className="text-uppercase">React Sneakers</h3>
						<p className="opacity-5">The shop of the best sneakers</p>
					</div>
				</div>
			</Link>
			<ul className="d-flex align-center justify-center">
				<li onClick={props.onClickCart} className="mr-20 cu-p d-flex align-center justify-center">
					<img width={18} height={18} src="/img/cart.svg" alt="Cart icon" />
					<span>1200$</span>
				</li>
				<li className="cu-p d-flex align-center justify-center">
					<Link to="/favorites">
						<img width={18} height={18} src="/img/heart.svg" alt="Heart icon" />
					</Link>
				</li>
				<li className="cu-p d-flex align-center justify-center">
					<img width={18} height={18} src="/img/user.svg" alt="User icon" />
				</li>
			</ul>
		</header>
	);
}

export default Header;
