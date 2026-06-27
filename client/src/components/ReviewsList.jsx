import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewsList = ({ reviews, bookId, user, token, onDeleteReview }) => {
	return (
		<div className='mt-10'>
			<h2 className='text-xl font-bold text-[#f4f4f3] mb-4'>Reviews</h2>
			{reviews.length === 0 && (
				<p className='text-[#9b9ba3] text-sm'>No reviews yet. Be the first!</p>
			)}
			{reviews.map((review) => (
				<ReviewCard
					key={review.id}
					review={review}
					bookId={bookId}
					user={user}
					token={token}
					onDelete={onDeleteReview}
				/>
			))}
		</div>
	);
};

export default ReviewsList;
