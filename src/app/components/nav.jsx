"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Nav() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div className="nav_component">
			<h1>BAGGY</h1>

			<div className="items">
				<ul>
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/cart">Cart</Link>
					</li>

					{/* Show Add Product only if user is admin */}
					{user?.role === "admin" && (
						<li>
							<Link href="/addProduct">Add Product</Link>
						</li>
					)}

					{/* Show Login/Signup if not logged in */}
					{!user ? (
						<>
							<li>
								<Link href="/login">Login</Link>
							</li>
							<li>
								<Link href="/signup">Signup</Link>
							</li>
						</>
					) : (
						/* Show Logout if logged in */
						<li>
							<button onClick={handleLogout}>Logout</button>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
}
