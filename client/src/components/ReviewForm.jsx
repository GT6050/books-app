import React from 'react';

const ReviewForm = ({ onSubmit, reviewForm, setReviewForm }) => {
	return (
		<div className='mt-10'>
			<h2 className='text-xl font-bold text-[#f4f4f3] mb-4'>Add a review</h2>
			<form
				onSubmit={onSubmit}
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
	);
};

export default ReviewForm;
