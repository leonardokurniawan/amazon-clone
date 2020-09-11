import React, {useEffect, useState} from 'react';
import {useStateValue} from '../../context/StateProvider';
import {db} from '../../services/firebase';
import './Orders.css';
import Order from '../../components/order/Order';

function Orders() {
	const [{basket, user}, dispatch] = useStateValue();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user) {
			db.collection('users')
				.doc(user?.uid)
				.collection('orders')
				.orderBy('created', 'desc')
				.onSnapshot((snapshot) =>
					setOrders(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						})),
					),
				);
		} else {
			setOrders([]);
		}
	}, [user]);
	return (
		<div className="orders">
			<h1>Your Order</h1>
			<div className="orders__order">
				{orders?.map((order) => (
					<Order order={order} />
				))}
			</div>
		</div>
	);
}

export default Orders;
