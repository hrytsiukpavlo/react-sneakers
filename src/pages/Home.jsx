import Card from "../components/Card";
import AppContext from "../context";
import { useContext } from "react";

export default function Home({
	items,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddToFavorite,
	onAddToCart,
	isLoading,
}) {
	const { isItemAdded } = useContext(AppContext);
	const renderItems = () => {
		const filteredItems = items.filter((item) =>
			item.title.toLowerCase().includes(searchValue.toLowerCase())
		);
		return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
			<Card
				key={index}
				onFavoriteClick={(obj) => onAddToFavorite(obj)}
				onPlusClick={(obj) => onAddToCart(obj)}
				added={isItemAdded(item && item.id)}
				loading={isLoading}
				{...item}
			/>
		));
	};

	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>{searchValue ? `Search results: ${searchValue}` : "All sneakers"}</h1>
				<div className="search-block d-flex">
					<img src="img/search.svg" alt="Search icon" />
					{searchValue && (
						<img
							onClick={() => setSearchValue("")}
							className="clear removeBtn cu-p"
							src="img/btn-remove.svg"
							alt="Clear"
						/>
					)}
					<input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
				</div>
			</div>

			<div className="d-flex flex-wrap">{renderItems()}</div>
		</div>
	);
}
