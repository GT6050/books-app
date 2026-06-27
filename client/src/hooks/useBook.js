import { useState, useEffect } from 'react';

export const useBook = (id) => {
	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const res = await fetch(`http://localhost:3000/books/${id}`);
				if (!res.ok) {
					throw new Error(`Response status: ${res.status}`);
				}
				const data = await res.json();
				setBook(data.book);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchBook();
	}, [id]);

	return { book, loading, error };
};
