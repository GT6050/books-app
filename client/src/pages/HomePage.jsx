import React from 'react';
import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';

const HomePage = () => {
	const { books, loading, error } = useBooks();
	const displayBooks = books.map((book, index) => (
		<BookCard key={book.id} book={book} index={index} />
	));
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
