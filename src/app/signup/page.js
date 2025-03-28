"use client";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { signup } from "../features/auth/authSlice";

export default function Signup() {
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
				await dispatch(signup(values));
				router.push("/login");
			} catch (error) {}
		},
	});

	return (
		<div className="auth-form-container">
			<div className="auth-form-wrapper">
				<h2 className="auth-form-title">Create an account</h2>

				{error && <div className="auth-form-error">Please Sign-Up first</div>}

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
						{loading ? "Creating account..." : "Sign Up"}
					</button>
				</form>

				<div className="auth-form-link">
					Already have an account ? <a href="/login">Log in</a>
				</div>
			</div>
		</div>
	);
}
