"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentProduct } from "./features/cart/cartSlice.jsx";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const router = useRouter();

	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch("/api/products");
				if (!res.ok) {
					throw new Error("Failed to fetch products");
				}
				const data = await res.json();
				setProducts(data.data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	const addToCartHandler = (product) => {
		if (!user) {
			router.push("/login");
			return;
		}
		dispatch(setCurrentProduct(product));
		router.push("/cart");
	};

	if (loading)
		return (
			<div className="loading">
				<div className="spinner"></div>
				<p>Loading products</p>
			</div>
		);

	if (error) return <div className="error">Error: {error}</div>;

	return (
		<main className="container_main">
			<header className="header">
				<h1 className="title">Our Products</h1>
				<p className="subtitle">Quality items for your everyday needs</p>
			</header>

			<div className="productGrid">
				{products.map((product) => (
					<article key={product._id} className={"productCard"}>
						<div className="imageContainer">
							<Image
								src={product.imageUrl}
								alt={product.title}
								className="productImage"
								width={245}
								height={245}
								priority
							/>
						</div>

						<div className="details">
							<h2 className="productTitle">{product.title}</h2>
							<p className="price">${product.price.toFixed(2)}</p>
							<p className="description">
								{product.description.length > 100
									? `${product.description.substring(0, 100)}...`
									: product.description}
							</p>

							<div className="actions">
								<button
									className="buyButton"
									onClick={() => addToCartHandler(product)}
								>
									Add to Cart
								</button>
							</div>
						</div>
					</article>
				))}
			</div>
		</main>
	);
}
