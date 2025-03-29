'use client';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	clearCart,
	removeFromCart,
	updateQuantity,
} from '../features/cart/cartSlice.jsx';

const CartPage = () => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.cart);

	const handleQuantityChange = (cartItemId, newQuantity) => {
		if (newQuantity < 1) {
			// Remove item if quantity would be 0
			dispatch(removeFromCart(cartItemId));
			toast.info('Item removed from cart');
			return;
		}
		dispatch(updateQuantity({ id: cartItemId, quantity: newQuantity }));
	};

	const handleRemoveItem = (cartItemId) => {
		dispatch(removeFromCart(cartItemId));
		toast.success('Item removed from cart');
	};

	const handleCheckout = () => {
		toast.info('Processing your order...', { autoClose: 2000 });

		// Simulate API call
		setTimeout(() => {
			toast.success('🎉 Order placed successfully!', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});

			// Clear cart after successful order
			dispatch(clearCart());

			// You could redirect to order confirmation page here
			// router.push('/order-confirmation');
		}, 2000);
	};

	const totalPrice = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	if (!cartItems.length) {
		return (
			<div className='empty-cart'>
				<h2>Your cart is empty</h2>
				<Link href='/'>Continue Shopping</Link>
			</div>
		);
	}

	return (
		<div className='cart-page'>
			<ToastContainer />
			<h1 className='cart-page-heading'>Your Shopping Cart</h1>

			<div className='cart-items'>
				{cartItems.map((item) => (
					<div key={item.cartItemId} className='cart-item'>
						<div className='item-image'>
							<Image
								src={item.imageUrl}
								alt={item.title}
								width={100}
								height={100}
							/>
						</div>

						<div className='item-details'>
							<h3>{item.title}</h3>
							<p>${item.price.toFixed(2)}</p>

							<div className='quantity-control'>
								<button
									onClick={() =>
										handleQuantityChange(item.cartItemId, item.quantity - 1)
									}
								>
									-
								</button>
								<span>{item.quantity}</span>
								<button
									onClick={() =>
										handleQuantityChange(item.cartItemId, item.quantity + 1)
									}
								>
									+
								</button>
							</div>

							<button
								onClick={() => handleRemoveItem(item.cartItemId)}
								className='remove-button'
							>
								Remove 🗑️
							</button>
						</div>
					</div>
				))}
			</div>

			<div className='cart-summary'>
				<div className='cart-summary-s1'>
					<h3>Order Summary</h3>
					<p>
						Total Items:{' '}
						{cartItems.reduce((sum, item) => sum + item.quantity, 0)}
					</p>
					<p>Total Price: ${totalPrice.toFixed(2)}</p>
				</div>
				<div className='cart-summary-s2'>
					<button onClick={handleCheckout} className='checkout-button'>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
