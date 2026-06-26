import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
const BookDetailPage = () => {
	const [book, setBook] = useState(null);
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [reviewForm, setReviewForm] = useState({ rating: '', comment: '' });
	const [error, setError] = useState(null);

	const { id } = useParams();
	const { token } = useAuth();
	const { rating, comment } = reviewForm;

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

		const fetchReviews = async () => {
			try {
				const res = await fetch(`http://localhost:3000/books/${id}/reviews`);
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
		fetchReviews();
	}, [id]);

	const handleReviewSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await fetch(`http://localhost:3000/books/${id}/reviews`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					rating,
					comment,
				}),
			});

			if (!res.ok) {
				throw new Error(`Response status: ${res.status}`);
			}

			const data = await res.json();
			setReviews((prevReviews) => [...prevReviews, data.review]);
		} catch (error) {
			setError(error);
		}
	};
	return (
		<main className='max-w-5xl mx-auto px-6 py-10'>
			{loading && <span>Loading...</span>}
			{book && (
				<div>
					<h1 className='text-3xl font-bold text-[#f4f4f3] tracking-tight mb-2'>
						{book.title}
					</h1>
					<p className='text-[#9b9ba3] text-sm mb-2'>{book.author}</p>
					<span className='text-[11px] font-semibold uppercase tracking-wide text-[#9b9ba3] bg-[#1b1b1f] border border-[#26262b] px-2.5 py-1 rounded-md'>
						{book.genre}
					</span>
					<p className='text-[#c8c8cf] text-sm mt-4 leading-relaxed'>
						{book.description}
					</p>
				</div>
			)}
			<div className='mt-10'>
				<h2 className='text-xl font-bold text-[#f4f4f3] mb-4'>Reviews</h2>
				{reviews.length === 0 && (
					<p className='text-[#9b9ba3] text-sm'>
						No reviews yet. Be the first!
					</p>
				)}
				{reviews.map((review) => (
					<div
						key={review.id}
						className='bg-[#141416] border border-[#1f1f23] rounded-2xl p-5 mb-3'>
						<p className='text-[#f6b73c] font-bold text-sm mb-1'>
							★ {review.rating} / 5
						</p>
						<p className='text-[#c8c8cf] text-sm'>{review.comment}</p>
					</div>
				))}
			</div>
			{token && (
				<div className='mt-10'>
					<h2 className='text-xl font-bold text-[#f4f4f3] mb-4'>
						Add a review
					</h2>
					<form
						onSubmit={handleReviewSubmit}
						className='bg-[#141416] border border-[#1f1f23] rounded-2xl p-6'>
						<label className='block text-xs font-semibold uppercase tracking-wide text-[#8a8a92] mb-2'>
							Rating (1-5)
						</label>
						<input
							type='number'
							min='1'
							max='5'
							className='w-full bg-[#131316] border border-[#2a2a30] rounded-[10px] px-3.5 py-3 text-[#f4f4f3] outline-none focus:border-[#f6b73c] text-sm mb-4'
							value={reviewForm.rating}
							onChange={(e) =>
								setReviewForm({ ...reviewForm, rating: e.target.value })
							}
						/>
						<label className='block text-xs font-semibold uppercase tracking-wide text-[#8a8a92] mb-2'>
							Comment
						</label>
						<textarea
							className='w-full bg-[#131316] border border-[#2a2a30] rounded-[10px] px-3.5 py-3 text-[#f4f4f3] outline-none focus:border-[#f6b73c] text-sm mb-4 resize-none h-24'
							value={reviewForm.comment}
							onChange={(e) =>
								setReviewForm({ ...reviewForm, comment: e.target.value })
							}
						/>
						<button className='bg-[#f6b73c] text-[#1a1404] font-semibold text-sm px-5 py-3 rounded-[10px] border-none cursor-pointer'>
							Submit review
						</button>
					</form>
				</div>
			)}
		</main>
	);
};

export default BookDetailPage;
