import React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';

const LoginPage = () => {
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({ email: '', password: '' });

	const { email, password } = formData;
	const { login } = useAuth();

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!email || !password) {
			setError('All fields are required');
			return;
		}
		try {
			const res = await fetch('http://localhost:3000/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			if (!res.ok) {
				const errData = await res.json();
				throw new Error(errData.message || 'Login failed');
			}

			const data = await res.json();
			login(data.user, data.token);
			navigate('/');
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
					Welcome back
				</h1>
				<p className='text-sm text-[#9b9ba3] mb-6'>Log in to your account</p>
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
					Log In
				</button>

				<p className='text-sm text-[#9b9ba3] mt-4 text-center'>
					Don't have an account?
					<NavLink to='/register' className='text-[#f6b73c] font-semibold'>
						Register
					</NavLink>
				</p>
				{error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default LoginPage;
