import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const AddBookPage = () => {
	const [formData, setFormData] = useState({
		title: '',
		author: '',
		genre: '',
		description: '',
		cover_image: '',
	});

	const [error, setError] = useState(null);
	const { title, author, genre, description, cover_image } = formData;
	const { token } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) navigate('/login');
	}, [token]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!title || !author || !genre || !description || !cover_image) {
			setError('All fields are required');
			return;
		}
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title,
					author,
					genre,
					description,
					cover_image,
				}),
			});

			if (!res.ok) {
				const errData = await res.json();
				throw new Error(errData.message || 'Failed to add book');
			}

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
					Add your book
				</h1>
				<p className='text-sm text-[#9b9ba3] mb-6'>
					Upload your favorite books
				</p>
				<label className='block text-xs font-semibold uppercase tracking-wide text-[#8a8a92] mb-2'>
					Title
				</label>
				<input
					type='text'
					placeholder='Book Title'
					className='w-full bg-[#131316] border border-[#2a2a30] rounded-[10px] px-3.5 py-3 text-[#f4f4f3] outline-none focus:border-[#f6b73c] text-sm mb-4'
					value={formData.title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
				/>

				<label className='block text-xs font-semibold uppercase tracking-wide text-[#8a8a92] mb-2'>
					Author
				</label>
				<input
					type='text'
					placeholder='Book author'
					className='w-full bg-[#131316] border border-[#2a2a30] rounded-[10px] px-3.5 py-3 text-[#f4f4f3] outline-none focus:border-[#f6b73c] text-sm mb-4'
					value={formData.author}
					onChange={(e) => setFormData({ ...formData, author: e.target.value })}
				/>
				<label className='block text-xs font-semibold uppercase tracking-wide text-[#8a8a92] mb-2'>
					Genre
				</label>
				<input
					type='text'
					placeholder='Book genre'
					className='w-full bg-[#131316] border border-[#2a2a30] rounded-[10px] px-3.5 py-3 text-[#f4f4f3] outline-none focus:border-[#f6b73c] text-sm mb-4'
					value={formData.genre}
					onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
				/>

				<label className='block text-xs font-semibold uppercase tracking-wide text-[#8a8a92] mb-2'>
					Description
				</label>
				<textarea
					placeholder='Write the description of the book'
					className='w-full bg-[#131316] border border-[#2a2a30] rounded-[10px] px-3.5 py-3 text-[#f4f4f3] outline-none focus:border-[#f6b73c] text-sm mb-4 resize-none h-24'
					value={formData.description}
					onChange={(e) =>
						setFormData({ ...formData, description: e.target.value })
					}
				/>
				<label className='block text-xs font-semibold uppercase tracking-wide text-[#8a8a92] mb-2'>
					Book image
				</label>
				<input
					type='text'
					placeholder='Book image link'
					className='w-full bg-[#131316] border border-[#2a2a30] rounded-[10px] px-3.5 py-3 text-[#f4f4f3] outline-none focus:border-[#f6b73c] text-sm mb-4'
					value={formData.cover_image}
					onChange={(e) =>
						setFormData({ ...formData, cover_image: e.target.value })
					}
				/>

				<button className='w-full bg-[#f6b73c] text-[#1a1404] font-semibold text-sm py-3 rounded-[10px] border-none cursor-pointer mt-2'>
					Public book
				</button>

				{error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default AddBookPage;
