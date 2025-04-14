import axios from 'axios';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

const axiosInstance = axios.create({
	baseURL:
		process.env.NEXT_PUBLIC_API_URL || 'https://baggy-backend.onrender.com/api',
});

axiosInstance.interceptors.request.use((config) => {
	const token = Cookies.get('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err.response?.status === 401 && window.location.pathname !== '/login') {
			Cookies.remove('token');
			redirect('/login'); // Uses Next.js App Router redirect
		}
		return Promise.reject(err);
	}
);

export default axiosInstance;
