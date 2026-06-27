import React from 'react';

const ReviewCard = ({ review, bookId, user, token, onDelete }) => {
	return (
		<div className='bg-[#141416] border border-[#1f1f23] rounded-2xl p-5 mb-3'>
			<p className='text-[#f6b73c] font-bold text-sm mb-1'>
				★ {review.rating} / 5
			</p>
			<p className='text-[#c8c8cf] text-sm'>{review.comment}</p>
			{user && user.id === review.user_id ? (
				<button
					onClick={() => onDelete(review.id)}
					className='mt-3 text-xs font-semibold text-red-400 hover:text-red-300 cursor-pointer bg-transparent border-none'>
					Delete review
				</button>
			) : null}
		</div>
	);
};

export default ReviewCard;
