import React, {useEffect, useState} from 'react';
import {useStateValue} from '../../context/StateProvider';
import './Payment.css';
import CheckoutProduct from '../../components/checkout-product/CheckoutProduct';
import {Link, useHistory} from 'react-router-dom';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import axios from '../../services/axios';
import {getBasketTotal} from '../../services/reducer';
import {db} from '../../services/firebase';

function Payment() {
	const [{basket, user}, dispatch] = useStateValue();

	const history = useHistory();

	const stripe = useStripe();
	const elements = useElements();

	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState(false);

	const [error, setError] = useState(null);
	const [disabled, setDisable] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

	useEffect(() => {
		// Generate stripe secret which allow us to charge customer
		const getClientSecret = async () => {
			const response = await axios({
				method: 'post',

				url: `/payments/create?total=${getBasketTotal(basket) * 100}  `,
			});
			setClientSecret(response.data.clientSecret);
		};
		getClientSecret();
	}, [basket]);

	console.log('THE SECRET IS >>> ', clientSecret);

	const handleSubmit = async (e) => {
		// example cc : use '42'
		e.preventDefault();
		setProcessing(true);

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({paymentIntent}) => {
				// paymentIntent = payment confirmation

				db.collection('users')
					.doc(user?.uid)
					.collection('orders')
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				setSucceeded(true);
				setError(null);
				setProcessing(false);

				dispatch({
					type: 'EMPTY_BASKET',
				});

				history.replace('/orders');
			});
	};

	const handleChange = (e) => {
		setDisable(e.empty);
		setError(e.error ? e.error.message : '');
	};

	return (
		<div className="payment">
			<div className="payment__container">
				<h1>
					Checkout (<Link to="/checkout">{basket?.length} items</Link>)
				</h1>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Delivery Address</h3>
					</div>
					<div className="payment__address">
						<p>{user?.email}</p>
						<p>Address</p>
						<p>City</p>
					</div>
				</div>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Review Items & Delivery</h3>
					</div>
					<div className="payment__items">
						{basket.map((item) => (
							<CheckoutProduct
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))}
					</div>
				</div>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>
					<div className="payment__details">
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className="payment__priceContainer">
								<CurrencyFormat
									renderText={(value) => (
										<>
											<h3>Order Total: {value}</h3>
										</>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
								</button>
								{error && <div>{error}</div>}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
