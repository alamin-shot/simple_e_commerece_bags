import axios from "@/app/lib/axios";
import Cookies from "js-cookie";

export const loginApi = async (email, password) => {
	const response = await axios.post("/auth/login", { email, password });
	Cookies.set("token", response.data.token);
	return response.data;
};

export const signupApi = async (email, password) => {
	const response = await axios.post("/auth/signup", { email, password });
	Cookies.set("token", response.data.token);
	return response.data;
};

export const fetchUserApi = async () => {
	const response = await axios.get("/user");
	return response.data;
};

export const logoutApi = () => {
	Cookies.remove("token");
	return true;
};
