import React from 'react';
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState(null);
	const { username, email, password } = formData;

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!username || !email || !password) {
			setError('All fields are required');
			return;
		}
		if (password.length < 8) {
			setError('Password must be at least 8 characters');
			return;
		}
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, email, password }),
			});
			if (!res.ok) {
				const errData = await res.json();
				throw new Error(errData.message || 'Registration failed');
			}
			navigate('/login');
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
			<form
				onSubmit={handleSubmit}
				className='w-full max-w-md bg-[#141416] border border-[#1f1f23] rounded-2xl p-8'>
				<h1 className='text-2xl font-bold text-[#f4f4f3] mb-2 tracking-tight'>
					Don't have an account
				</h1>
				<p className='text-sm text-[#9b9ba3] mb-6'>Register for full access</p>
				<label className='block text-xs font-semibold uppercase tracking-wide text-[#8a8a92] mb-2'>
					Username
				</label>
				<input
					type='text'
					placeholder='Username'
					className='w-full bg-[#131316] border border-[#2a2a30] rounded-[10px] px-3.5 py-3 text-[#f4f4f3] outline-none focus:border-[#f6b73c] text-sm mb-4'
					value={formData.username}
					onChange={(e) =>
						setFormData({ ...formData, username: e.target.value })
					}
				/>

				<label className='block text-xs font-semibold uppercase tracking-wide text-[#8a8a92] mb-2'>
					Email
				</label>
				<input
					type='email'
					placeholder='you@example.com'
					className='w-full bg-[#131316] border border-[#2a2a30] rounded-[10px] px-3.5 py-3 text-[#f4f4f3] outline-none focus:border-[#f6b73c] text-sm mb-4'
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				/>
				<label className='block text-xs font-semibold uppercase tracking-wide text-[#8a8a92] mb-2'>
					Password
				</label>
				<input
					type='password'
					placeholder='Type your password'
					className='w-full bg-[#131316] border border-[#2a2a30] rounded-[10px] px-3.5 py-3 text-[#f4f4f3] outline-none focus:border-[#f6b73c] text-sm mb-4'
					value={formData.password}
					onChange={(e) =>
						setFormData({ ...formData, password: e.target.value })
					}
				/>
				<button className='w-full bg-[#f6b73c] text-[#1a1404] font-semibold text-sm py-3 rounded-[10px] border-none cursor-pointer mt-2'>
					Register
				</button>

				<p className='text-sm text-[#9b9ba3] mt-4 text-center'>
					Already have an account?
					<NavLink to='/login' className='text-[#f6b73c] font-semibold'>
						Log in
					</NavLink>
				</p>
				{error && (
					<p className='text-red-400 text-sm mt-3 text-center'>{error}</p>
				)}
			</form>
		</div>
	);
};

export default RegisterPage;
