import { useState, useEffect } from 'react';

export const useBooks = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		async function fetchBooks() {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/books`);
				const data = await res.json();
				setBooks(data.books);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchBooks();
	}, []);
	return { books, loading, error };
};
