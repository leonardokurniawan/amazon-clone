import React from 'react';
import './Product.css';
import {useStateValue} from '../../context/StateProvider';

function Product({id, title, image, price, rating}) {
	const [{basket}, dispatch] = useStateValue();
	const addToBasket = () => {
		// Dispatch the item into the data layer
		dispatch({
			type: 'ADD_TO_BASKET',
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
			},
		});
	};
	return (
		<div className="product">
			<div className="product__info">
				<p>{title}</p>
				<p className="product__price">
					<small>£</small>
					<strong>{price}</strong>
				</p>
				<div className="product__rating">
					{Array(rating)
						.fill()
						.map((_, i) => (
							<span key={i} role="img" aria-label="star">
								⭐
							</span>
						))}
				</div>
			</div>
			<img alt={title} src={image} />
			<button onClick={addToBasket}>Add to Basket</button>
		</div>
	);
}

export default Product;
