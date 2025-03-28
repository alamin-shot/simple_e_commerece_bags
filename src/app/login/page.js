"use client";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { login } from "../features/auth/authSlice";

export default function Login() {
	const { loading, error } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			email: yup
				.string()
				.email("Invalid email address")
				.required("Email is required"),
			password: yup
				.string()
				.min(6, "Password must be at least 6 characters")
				.required("Password is required"),
		}),
		onSubmit: async (values) => {
			try {
				await dispatch(login(values));
				router.push("/");
			} catch (error) {}
		},
	});

	return (
		<div className="auth-form-container">
			<div className="auth-form-wrapper">
				<h2 className="auth-form-title">Log in to your account</h2>

				{error && <div className="auth-form-error">Please Log-In first</div>}

				<form onSubmit={formik.handleSubmit}>
					<div className="auth-form-group">
						<label htmlFor="email" className="auth-form-label">
							Email address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							className={`auth-form-input ${
								formik.touched.email && formik.errors.email ? "error" : ""
							}`}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
						/>
						{formik.touched.email && formik.errors.email && (
							<div className="auth-error-message">{formik.errors.email}</div>
						)}
					</div>

					<div className="auth-form-group">
						<label htmlFor="password" className="auth-form-label">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							className={`auth-form-input ${
								formik.touched.password && formik.errors.password ? "error" : ""
							}`}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
						/>
						{formik.touched.password && formik.errors.password && (
							<div className="auth-error-message">{formik.errors.password}</div>
						)}
					</div>

					<button type="submit" className="auth-submit-btn" disabled={loading}>
						{loading ? "Logging in..." : "Log In"}
					</button>
				</form>

				<div className="auth-form-link">
					Dont have an account ? <a href="/signup">Sign up</a>
				</div>
			</div>
		</div>
	);
}
