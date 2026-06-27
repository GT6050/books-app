import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBook } from '../hooks/useBook';
import { useReviews } from '../hooks/useReviews';
import BookInfo from '../components/BookInfo';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewForm';

const BookDetailPage = () => {
	const { id } = useParams();
	const { token, user } = useAuth();
	const { book, loading: bookLoading } = useBook(id);
	const { reviews, setReviews } = useReviews(id);
	const [reviewForm, setReviewForm] = useState({ rating: '', comment: '' });
	const [error, setError] = useState(null);
	const { rating, comment } = reviewForm;
	const navigate = useNavigate();
	const handleReviewSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/books/${id}/reviews`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						rating: Number(rating),
						comment,
					}),
				},
			);

			if (!res.ok) {
				throw new Error(`Response status: ${res.status}`);
			}

			const data = await res.json();
			const refreshed = await fetch(
				`${import.meta.env.VITE_API_URL}/books/${id}/reviews`,
			);
			const refreshedData = await refreshed.json();
			setReviews(refreshedData.reviews);
			setReviewForm({ rating: '', comment: '' });
		} catch (error) {
			setError(error);
		}
	};

	const handleDeleteBook = async () => {
		if (!window.confirm('Are you sure you want to delete this book?')) return;
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/books/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (!res.ok) throw new Error('Failed to delete book');
			navigate('/');
		} catch (err) {
			setError(err.message);
		}
	};

	const handleDeleteReview = async (reviewId) => {
		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/books/${id}/reviews/${reviewId}`,
				{
					method: 'DELETE',
					headers: { Authorization: `Bearer ${token}` },
				},
			);
			if (!res.ok) throw new Error('Failed to delete review');
			setReviews((prev) => prev.filter((r) => r.id !== reviewId));
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<main className='max-w-5xl mx-auto px-6 py-10'>
			{bookLoading && <span>Loading...</span>}
			{book && (
				<BookInfo
					book={book}
					user={user}
					onDelete={handleDeleteBook}
					onEdit={() => navigate(`/books/${id}/edit`)}
				/>
			)}
			<ReviewsList
				reviews={reviews}
				bookId={id}
				user={user}
				token={token}
				onDeleteReview={handleDeleteReview}
			/>

			{token && (
				<ReviewForm
					onSubmit={handleReviewSubmit}
					reviewForm={reviewForm}
					setReviewForm={setReviewForm}
				/>
			)}
		</main>
	);
};

export default BookDetailPage;
