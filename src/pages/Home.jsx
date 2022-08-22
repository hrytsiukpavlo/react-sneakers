import Card from "../components/Card";

export default function Home({
	items,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddToFavorite,
	onAddToCart,
}) {
	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>{searchValue ? `Search results: ${searchValue}` : "All sneakers"}</h1>
				<div className="search-block d-flex">
					<img src="/img/search.svg" alt="Search icon" />
					{searchValue && (
						<img
							onClick={() => setSearchValue("")}
							className="clear removeBtn cu-p"
							src="/img/btn-remove.svg"
							alt="Clear"
						/>
					)}
					<input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
				</div>
			</div>

			<div className="d-flex flex-wrap">
				{items
					.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
					.map((item, index) => (
						<Card
							key={index}
							onFavoriteClick={(obj) => onAddToFavorite(obj)}
							onPlusClick={(obj) => onAddToCart(obj)}
							{...item}
						/>
					))}
			</div>
		</div>
	);
}
