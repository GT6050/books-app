import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate('/login');
	};
	return (
		<header className='fixed top-0 z-50 w-full backdrop-blur-md bg-[#0a0a0c]/70 border-b border-[#1c1c20]'>
			<div className='max-w-5xl mx-auto px-6 py-3 flex items-center justify-between'>
				<NavLink
					to='/'
					className='w-8 h-8 bg-[#f6b73c] text-[#1a1404] font-bold text-base rounded-lg flex items-center justify-center'>
					M
				</NavLink>
				<div className='hidden md:flex items-center gap-2'>
					<NavLink
						to='/'
						className='text-sm font-semibold text-[#9b9ba3] hover:text-[#f4f4f3] px-3 py-2 rounded-lg'>
						Home
					</NavLink>
					<NavLink
						to='/add'
						className='text-sm font-semibold text-[#9b9ba3] hover:text-[#f4f4f3] px-3 py-2 rounded-lg'>
						Add book
					</NavLink>
					{user ? (
						<button
							onClick={handleLogout}
							className="bg-[#f6b73c] text-[#1a1404] font-semibold text-sm px-4 py-2 rounded-[10px] cursor-pointer border-none font-['Hanken_Grotesk']">
							Logout
						</button>
					) : (
						<>
							<NavLink
								to='/login'
								className='text-sm font-semibold text-[#9b9ba3] hover:text-[#f4f4f3] px-3 py-2 rounded-lg'>
								Login
							</NavLink>
							<NavLink
								to='/register'
								className='text-sm font-semibold text-[#9b9ba3] hover:text-[#f4f4f3] px-3 py-2 rounded-lg'>
								Register
							</NavLink>
						</>
					)}
				</div>

				<button
					className='md:hidden text-[#f4f4f3] text-xl cursor-pointer background-transparent border-none'
					onClick={() => setIsOpen(!isOpen)}>
					<span>{isOpen ? '✕' : '☰'}</span>
				</button>
			</div>

			{isOpen && (
				<div className='md:hidden flex flex-col gap-2 px-6 pb-4 border-t border-[#1c1c20]'>
					<NavLink
						to='/'
						className='text-sm font-semibold text-[#9b9ba3] hover:text-[#f4f4f3] px-3 py-2 rounded-lg'>
						Home
					</NavLink>
					<NavLink
						to='/add'
						className='text-sm font-semibold text-[#9b9ba3] hover:text-[#f4f4f3] px-3 py-2 rounded-lg'>
						Add book
					</NavLink>
					{user ? (
						<button
							onClick={handleLogout}
							className="bg-[#f6b73c] text-[#1a1404] font-semibold text-sm px-4 py-2 rounded-[10px] cursor-pointer border-none font-['Hanken_Grotesk']">
							Logout
						</button>
					) : (
						<>
							<NavLink
								to='/login'
								className='text-sm font-semibold text-[#9b9ba3] hover:text-[#f4f4f3] px-3 py-2 rounded-lg'>
								Login
							</NavLink>
							<NavLink
								to='/register'
								className='text-sm font-semibold text-[#9b9ba3] hover:text-[#f4f4f3] px-3 py-2 rounded-lg'>
								Register
							</NavLink>
						</>
					)}
				</div>
			)}
		</header>
	);
};

export default Navbar;
