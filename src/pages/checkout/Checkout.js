import React, {forwardRef} from 'react';
import './Checkout.css';
import Subtotal from '../../components/subtotal/Subtotal';
import CheckoutProduct from '../../components/checkout-product/CheckoutProduct';
import {useStateValue} from '../../context/StateProvider';
import FlipMove from 'react-flip-move';

const FunctionalCheckoutProduct = forwardRef((props, ref) => (
	<div ref={ref}>
		<CheckoutProduct
			id={props.id}
			title={props.title}
			price={props.price}
			image={props.image}
			rating={props.rating}
		/>
	</div>
));

const CheckoutProductBundle = ({props}) => (
	<FlipMove>
		{props.map((item) => (
			<FunctionalCheckoutProduct key={props.id} {...item} />
		))}
	</FlipMove>
);

function Checkout() {
	const [{basket}, dispatch] = useStateValue();

	return (
		<div className="checkout">
			<div className="checkout__left">
				<img
					className="checkout__ad"
					src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
					alt="Banner"
				/>
				<div>
					<h2 className="checkout__title">Your shopping Basket</h2>
					<CheckoutProductBundle props={basket} />
				</div>
			</div>
			<div className="checkout__right">
				<Subtotal />
			</div>
		</div>
	);
}

export default Checkout;
