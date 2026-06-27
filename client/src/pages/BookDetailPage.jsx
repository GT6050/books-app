import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBook } from '../hooks/useBook';
import { useReviews } from '../hooks/useReviews';
import ReviewCard from '../components/ReviewCard';

const BookDetailPage = () => {
	const { id } = useParams();
	const { token } = useAuth();
	const { book, loading: bookLoading } = useBook(id);
	const { reviews, setReviews } = useReviews(id);
	const [reviewForm, setReviewForm] = useState({ rating: '', comment: '' });
	const [error, setError] = useState(null);
	const { rating, comment } = reviewForm;

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
					rating: Number(rating),
					comment,
				}),
			});

			if (!res.ok) {
				throw new Error(`Response status: ${res.status}`);
			}

			const data = await res.json();
			console.log('review response:', data);
			setReviews((prevReviews) => [...prevReviews, data.review]);
			setReviewForm({ rating: '', comment: '' });
		} catch (error) {
			setError(error);
		}
	};

	return (
		<main className='max-w-5xl mx-auto px-6 py-10'>
			{bookLoading && <span>Loading...</span>}
			{book && (
				<div className='flex flex-col md:flex-row gap-8 mb-12'>
		
					<div className='w-full md:w-64 shrink-0'>
						<img
							src={book.cover_image}
							alt={book.title}
							className='w-full rounded-2xl object-cover shadow-lg'
						/>
					</div>

				
					<div className='flex-1'>
						<h1 className='text-3xl font-bold text-[#f4f4f3] tracking-tight mb-2'>
							{book.title}
						</h1>
						<p className='text-[#9b9ba3] text-sm mb-3'>{book.author}</p>
						<span className='text-[11px] font-semibold uppercase tracking-wide text-[#9b9ba3] bg-[#1b1b1f] border border-[#26262b] px-2.5 py-1 rounded-md'>
							{book.genre}
						</span>
						<p className='text-[#c8c8cf] text-sm mt-6 leading-relaxed'>
							{book.description}
						</p>
					</div>
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
					<ReviewCard key={review.id} review={review} />
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
