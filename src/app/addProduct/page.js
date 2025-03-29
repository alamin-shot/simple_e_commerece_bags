'use client';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

export default function ProductForm() {
	const router = useRouter();
	const initialValues = {
		imageUrl: '',
		title: '',
		price: '',
		description: '',
	};

	const validationSchema = Yup.object({
		imageUrl: Yup.string().url('Must be a valid URL').required('Required'),
		title: Yup.string()
			.max(100, 'Must be 100 characters or less')
			.required('Required'),
		price: Yup.number().positive('Price must be positive').required('Required'),
		description: Yup.string().max(500, 'Must be 500 characters or less'),
	});

	const onSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			const res = await fetch('/api/products', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});
			const result = await res.json();
			if (!res.ok) {
				throw new Error(result.error || 'Something went wrong');
			}
			toast.success('Product added successfully!', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				onClose: () => router.push('/'), // Redirect after toast closes
			});
			resetForm();
		} catch (error) {
			console.error('Submission error:', error);
			alert('Error submitting form');
		} finally {
			setSubmitting(false);
		}
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return (
		<div className='product-form-container'>
			<ToastContainer />
			<h1 className='form-title'>Add New Product</h1>

			<form onSubmit={formik.handleSubmit} className='product-form'>
				<div className='form-group'>
					<label htmlFor='imageUrl'>Image URL</label>
					<input
						id='imageUrl'
						name='imageUrl'
						type='url'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.imageUrl}
					/>
					{formik.touched.imageUrl && formik.errors.imageUrl ? (
						<div className='error-message'>{formik.errors.imageUrl}</div>
					) : null}
				</div>

				<div className='form-group'>
					<label htmlFor='title'>Product Title</label>
					<input
						id='title'
						name='title'
						type='text'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.title}
					/>
					{formik.touched.title && formik.errors.title ? (
						<div className='error-message'>{formik.errors.title}</div>
					) : null}
				</div>

				<div className='form-group'>
					<label htmlFor='price'>Price</label>
					<input
						id='price'
						name='price'
						type='number'
						step='0.01'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.price}
					/>
					{formik.touched.price && formik.errors.price ? (
						<div className='error-message'>{formik.errors.price}</div>
					) : null}
				</div>

				<div className='form-group'>
					<label htmlFor='description'>Description</label>
					<textarea
						id='description'
						name='description'
						rows='3'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.description}
					/>
					{formik.touched.description && formik.errors.description ? (
						<div className='error-message'>{formik.errors.description}</div>
					) : null}
				</div>

				<button
					type='submit'
					className='submit-button'
					disabled={formik.isSubmitting}
				>
					{formik.isSubmitting ? 'Submitting...' : 'Add Product'}
				</button>
			</form>
		</div>
	);
}
