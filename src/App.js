import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [
	{
		title: "Nike Blazer Mid Suede",
		price: 85,
		imageUrl: "/img/sneakers/1.jpg",
	},
	{
		title: "Nike Air Max 270",
		price: 110,
		imageUrl: "/img/sneakers/2.jpg",
	},
];

function App() {
	return (
		<div className="wrapper clear">
			<Drawer />
			<Header />
			<div className="content p-40">
				<div className="d-flex align-center mb-40 justify-between">
					<h1>All sneakers</h1>
					<div className="search-block d-flex">
						<img src="/img/search.svg" alt="Search icon" />
						<input placeholder="Search..." />
					</div>
				</div>

				<div className="d-flex">
					{arr.map((obj) => (
						<Card
							title={obj.title}
							price={obj.price}
							imageUrl={obj.imageUrl}
							onClick={() => alert(123)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
