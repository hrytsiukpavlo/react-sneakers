import Card from "../components/Card";

export default function Favorites({ items, onAddToFavorite }) {
	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>My bookmarks</h1>
			</div>

			<div className="d-flex flex-wrap">
				{items.map((item, index) => (
					<Card key={index} favorited={true} onFavoriteClick={onAddToFavorite} {...item} />
				))}
			</div>
		</div>
	);
}
