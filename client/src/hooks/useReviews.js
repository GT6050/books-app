import { useState, useEffect } from 'react';

export const useReviews = (id) => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const res = await fetch(
					`${import.meta.env.VITE_API_URL}/books/${id}/reviews`,
				);
				if (!res.ok) {
					throw new Error(`Response status: ${res.status}`);
				}
				const data = await res.json();
				setReviews(data.reviews);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchBook();
	}, [id]);

	return { reviews, setReviews, loading, error };
};
