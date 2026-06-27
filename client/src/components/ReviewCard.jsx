import React from 'react';

const ReviewCard = ({ review }) => {
	return (
		<div className='bg-[#141416] border border-[#1f1f23] rounded-2xl p-5 mb-3'>
			<p className='text-[#f6b73c] font-bold text-sm mb-1'>
				★ {review.rating} / 5
			</p>
			<p className='text-[#c8c8cf] text-sm'>{review.comment}</p>
		</div>
	);
};

export default ReviewCard;
