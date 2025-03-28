"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
const CartSection = () => {
	const [quantity, setQuantity] = useState(1);
	const router = useRouter();
	const product = useSelector((state) => state.cart.currentProduct);
	const handleBuyNow = () => {
		// Here you would typically send data to your backend
		console.log("Buying:", { product, quantity });

		toast.success("Item purchased successfully!", {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
		router.push("/");
	};
	if (!product) {
		return (
			<div className="cart-empty">
				🛒 <br />
				No product selected.
			</div>
		);
	}
	return (
		<div className="cart-container">
			<ToastContainer />

			<div className="product-image-container">
				<Image
					src={product.imageUrl}
					alt={product.title}
					width={345}
					height={345}
					className="product-image"
				/>
			</div>

			<div className="product-details">
				<h2 className="product-title">{product.title}</h2>
				<p className="product-price">${product.price.toFixed(2)}</p>
				<p className="product-description">{product.description}</p>

				<div className="quantity-selector">
					<button
						onClick={() => setQuantity((q) => Math.max(1, q - 1))}
						className="quantity-button"
					>
						-
					</button>
					<span className="quantity">{quantity}</span>
					<button
						onClick={() => setQuantity((q) => q + 1)}
						className="quantity-button"
					>
						+
					</button>
				</div>

				<button onClick={handleBuyNow} className="buy-now-button">
					Buy Now
				</button>
			</div>
		</div>
	);
};

export default CartSection;
