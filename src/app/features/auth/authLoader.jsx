// Example: In a root component
"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchuser } from "./authSlice";

export default function AuthLoader({ children }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchuser()); // Fetch user data if token exists
	}, [dispatch]);

	return children;
}
