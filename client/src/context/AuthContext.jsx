import React from 'react';
import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);

	const login = (userData, token) => {
		setUser(userData);
		setToken(token);
		localStorage.setItem('user', JSON.stringify(userData));
		localStorage.setItem('token', token);
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	};

	useEffect(() => {
		const savedToken = localStorage.getItem('token');
		const savedUser = localStorage.getItem('user');
		if (savedToken && savedUser && savedUser !== 'undefined') {
			setToken(savedToken);
			setUser(JSON.parse(savedUser));
		}
	}, []);
	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
