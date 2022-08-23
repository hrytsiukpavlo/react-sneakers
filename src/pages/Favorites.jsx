import Card from "../components/Card";
import { useContext } from "react";
import AppContext from "../context";

export default function Favorites() {
	const { favorites, onAddToFavorite } = useContext(AppContext);
	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>My bookmarks</h1>
			</div>

			<div className="d-flex flex-wrap">
				{favorites.map((item, index) => (
					<Card key={index} favorited={true} onFavoriteClick={onAddToFavorite} {...item} />
				))}
			</div>
		</div>
	);
}
