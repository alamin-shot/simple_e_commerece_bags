"use client";
import "./globals.css";
import Nav from "./components/nav";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import AuthLoader from "./features/auth/authLoader";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Provider store={store}>
					<AuthLoader>
						<Nav />
						{children}
					</AuthLoader>
				</Provider>
			</body>
		</html>
	);
}
