'use client';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Link from 'next/link';
import { addToCart } from '../features/cart/cartSlice.jsx';

const CartSection = () => {
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();
	const product = useSelector((state) => state.cart.currentProduct);
	console.log('Current product:', product);
	const cartItems = useSelector((state) => state.cart.cartItems);
	const existingCartItem = cartItems.find((item) => item.id === product?.id);
	const handleAddToCart = () => {
		if (!product) return;

		dispatch(addToCart({ ...product, quantity, cartItemId: Date.now() }));

		toast.success(
			existingCartItem
				? `Added another (Total: ${existingCartItem.quantity + quantity})`
				: 'Item added to cart!',
			{
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			}
		);

		setQuantity(1);
	};

	if (!product) {
		return (
			<div className='cart-empty'>
				🛒 <br />
				No product selected.
				<Link href='/'>Back to shopping</Link>
			</div>
		);
	}

	return (
		<div className='cart-container'>
			<ToastContainer />

			<div className='product-image-container'>
				<Image
					src={product.imageUrl}
					alt={product.title}
					width={345}
					height={345}
					className='product-image'
					priority={true}
				/>
			</div>

			<div className='product-details'>
				<h2 className='product-title'>{product.title}</h2>
				<p className='product-price'>${product.price.toFixed(2)}</p>
				<p className='product-description'>{product.description}</p>

				<div className='product-details-btn'>
					<button onClick={handleAddToCart} className='add-to-cart-button'>
						Add to Cart
					</button>

					<Link href='/cart' className='view-cart-link'>
						View Cart
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CartSection;
