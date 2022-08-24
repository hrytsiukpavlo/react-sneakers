import Card from "../components/Card";
import { useContext } from "react";
import AppContext from "../context";
import { Link } from "react-router-dom";

export default function Favorites() {
	const { favorites, onAddToFavorite } = useContext(AppContext);
	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>My bookmarks</h1>
			</div>

			<div className="d-flex flex-wrap">
				{favorites.length > 0 ? (
					favorites.map((item, index) => (
						<Card key={index} favorited={true} onFavoriteClick={onAddToFavorite} {...item} />
					))
				) : (
					<div className="emptyFavorites">
						<img src="img/crying.png" alt="Crying emoji" />
						<h2>No favorites :(</h2>
						<p>You didn't add anything to your favorites</p>

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
