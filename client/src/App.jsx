import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddBookPage from './pages/AddBookPage';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import EditBookPage from './pages/EditBookPage';

const App = () => {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/books/:id' element={<BookDetailPage />} />
						<Route path='/books/:id/edit' element={<EditBookPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/add' element={<AddBookPage />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</>
	);
};

export default App;
