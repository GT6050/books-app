import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book, index }) => {
	const navigate = useNavigate();

	const coverColors = [
		'#2e2a3f',
		'#243530',
		'#38291f',
		'#2a3344',
		'#3a2730',
		'#1f3338',
		'#332f22',
		'#2b2b30',
	];

	return (
		<div
			className='bg-[#141416] border border-[#1f1f23] rounded-2xl overflow-hidden cursor-pointer hover:border-[#34343a] hover:-translate-y-1 transition flex flex-col h-[360px]'
			onClick={() => navigate(`/books/${book.id}`)}>
			<div
				className='flex-1 overflow-hidden'
				style={{ backgroundColor: coverColors[index % coverColors.length] }}>
				{book.cover_image && (
					<img
						src={book.cover_image}
						alt={book.title}
						className='w-full h-full object-cover'
						onError={(e) => {
							e.target.style.display = 'none';
						}}
					/>
				)}
			</div>

			<div className='p-4 shrink-0'>
				<h3 className='text-[#f4f4f3] font-bold text-sm mb-1 leading-tight'>
					{book.title}
				</h3>
				<p className='text-[#9b9ba3] text-xs mb-3'>{book.author}</p>
				<span className='text-[11px] font-semibold uppercase tracking-wide text-[#9b9ba3] bg-[#1b1b1f] border border-[#26262b] px-2.5 py-1 rounded-md'>
					{book.genre}
				</span>
			</div>
		</div>
	);
};

export default BookCard;
