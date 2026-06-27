import React from 'react';

const BookInfo = ({ book, user, onDelete }) => {
	console.log('user.id:', user?.id, typeof user?.id);
	console.log('book.created_by:', book?.created_by, typeof book?.created_by);
	return (
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
				{user && user.id === book.created_by && (
					<div className='flex gap-3 mt-6'>
						<button
							onClick={onDelete}
							className='bg-red-500/10 text-red-400 border border-red-500/20 font-semibold text-sm px-4 py-2 rounded-[10px] cursor-pointer'>
							Delete book
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default BookInfo;
