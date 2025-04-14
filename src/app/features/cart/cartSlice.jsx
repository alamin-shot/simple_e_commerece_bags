import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentProduct: null,
	cartItems: [],
	products: [], // Add products cache
	loading: false,
	error: null,
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
				cartItemId: Date.now(),
			});
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(item) => item.cartItemId !== action.payload
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
		// Add these new reducers for product caching
		setProducts: (state, action) => {
			state.products = action.payload;
			state.loading = false;
			state.error = null;
		},
		setProductsLoading: (state) => {
			state.loading = true;
			state.error = null;
		},
		setProductsError: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	setCurrentProduct,
	addToCart,
	removeFromCart,
	updateQuantity,
	clearCart,
	setProducts,
	setProductsLoading,
	setProductsError,
} = cartSlice.actions;

export default cartSlice.reducer;
