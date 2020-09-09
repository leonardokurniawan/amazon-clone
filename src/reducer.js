export const initialState = {
	basket: [],
	subTotal: 0,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TO_BASKET':
			let newState = [...state.basket, action.item];
			let newSubTotal = 0;
			newState.map((data, i) => {
				newSubTotal += data.price;
			});
			return {
				...state,
				basket: [...state.basket, action.item],
				subTotal: newSubTotal,
			};

		default:
			return state;
	}
};

export default reducer;
