import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentProduct: null,
	cartItems: [], // This will store all cart items
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCurrentProduct: (state, action) => {
			state.currentProduct = action.payload;
		},
		addToCart: (state, action) => {
			state.cartItems.push({
				...action.payload,
				quantity: action.payload.quantity || 1,
				cartItemId: Date.now(), // Add unique identifier
			});
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(item) => item.cartItemId  !== action.payload
			);
		},
		updateQuantity: (state, action) => {
			const { id, quantity } = action.payload;
			const item = state.cartItems.find((item) => item.cartItemId === id);
			if (item) {
				item.quantity = quantity;
			}
		},
		clearCart: (state) => {
			state.cartItems = [];
		},
	},
});

export const {
	setCurrentProduct,
	addToCart,
	removeFromCart,
	updateQuantity,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
