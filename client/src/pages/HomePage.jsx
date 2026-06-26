import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchBooks() {
			try {
				const res = await fetch('http://localhost:3000/books');
				const data = await res.json();
				console.log(data);
				setBooks(data.books);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchBooks();
	}, []);

	const coverColors = [
		'#2e2a3f',
		'#243530',
		'#38291f',
		'#2a3344',
		'#3a2730',
		'#1f3338',
		'#332f22',
		'#2b2b30',
	];

	const displayBooks = books.map((book, key) => {
		return (
			<div
				key={key}
				className='bg-[#141416] border border-[#1f1f23] rounded-2xl overflow-hidden cursor-pointer hover:border-[#34343a] hover:-translate-y-1 transition'
				onClick={() => navigate(`/books/${book.id}`)}>
				<div
					className='h-58 flex flex-col justify-end p-5'
					style={{ background: coverColors[key % coverColors.length] }}>
					<h3 className='text-white font-bold text-lg leading-tight'>
						{book.title}
					</h3>
					<p className='text-white/60 text-xs font-semibold uppercase tracking-wide mt-2'>
						{book.author}
					</p>
				</div>
				<div className='p-4 flex items-center justify-between'>
					<span className='text-[11px] font-semibold uppercase tracking-wide text-[#9b9ba3] bg-[#1b1b1f] border border-[#26262b] px-2.5 py-1 rounded-md'>
						{book.genre}
					</span>
				</div>
			</div>
		);
	});
	return (
		<main className='max-w-5xl mx-auto px-6 py-10'>
			<h1 className='text-3xl font-bold text-[#f4f4f3] tracking-tight mb-2'>
				Discover books
			</h1>
			{loading && <span>Loading...</span>}
			{error ? <span>404 Not found</span> : null}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{displayBooks}
			</div>
		</main>
	);
};

export default HomePage;
