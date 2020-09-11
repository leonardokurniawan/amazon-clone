import React, {useEffect} from 'react';
import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Checkout from './pages/checkout/Checkout';
import Payment from './pages/payment/Payment';
import Orders from './pages/orders/Orders';
import Login from './pages/login/Login';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {auth} from './services/firebase';
import {useStateValue} from './context/StateProvider';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const promise = loadStripe(
	'pk_test_51HQEEHLjfhph6pNiAwERaGBiblybepOPlJ3e40n1LEBQrHzJXajmBTF90obPVq4ITFokM5P02fpcnlXC8fsxSa2J00WJEJbCXy',
);

function App() {
	const [{}, dispatch] = useStateValue();
	useEffect(() => {
		// will only run once when the app component loads...
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// the user just logged in / the user was logged in

				dispatch({
					type: 'SET_USER',
					user: authUser,
				});
			} else {
				// the user is logged out
				dispatch({
					type: 'SET_USER',
					user: null,
				});
			}
		});
	}, []);

	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/checkout">
						<Header />
						<Checkout />
					</Route>
					<Route path="/payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					<Route path="/orders">
						<Header />
						<Orders />
					</Route>
					<Route path="/">
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
