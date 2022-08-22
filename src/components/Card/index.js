import React, { useState } from "react";
import styles from "./Card.module.scss";

function Card({ id, imageUrl, title, price, onFavoriteClick, onPlusClick, favorited = false }) {
	const [isAdded, setIsAdded] = useState(false);
	const [isFavorite, setIsFavorite] = useState(favorited);

	const handleClick = () => {
		onPlusClick({ title, imageUrl, price });
		setIsAdded(!isAdded);
	};

	const onClickFavorite = () => {
		onFavoriteClick({ id, title, imageUrl, price });
		setIsFavorite(!isFavorite);
	};

	return (
		<div className={styles.card}>
			<div className={styles.favorite} onClick={onClickFavorite}>
				<img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Unliked icon" />
			</div>
			<img width={133} height={112} src={imageUrl} alt="Sneakers" />
			<h5>{title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Price:</span>
					<b>{price}$</b>
				</div>
				<button className="button">
					<img
						onClick={handleClick}
						src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
						alt="Add icon"
					/>
				</button>
			</div>
		</div>
	);
}

export default Card;