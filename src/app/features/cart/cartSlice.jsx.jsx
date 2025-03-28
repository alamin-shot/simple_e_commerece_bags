import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentProduct: null,
	cartItems: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setCurrentProduct: (state, action) => {
			state.currentProduct = action.payload;
		},
	},
});

const cartReducer = cartSlice.reducer;

export const { setCurrentProduct } = cartSlice.actions;

export default cartReducer;
