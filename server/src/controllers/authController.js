const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../db/index.js');

const register = async (req, res) => {
	const { username, email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);

	const result = await pool.query(
		'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
		[username, email, hashedPassword],
	);

	res.status(201).json({ user: result.rows[0] });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const result = await pool.query('SELECT * FROM users WHERE email = $1', [
		email,
	]);

	if (result.rows.length === 0) {
		return res.status(404).json({ message: 'User not found' });
	}

	const foundUser = result.rows[0];

	const isMatch = await bcrypt.compare(password, foundUser.password);
	if (!isMatch) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	const privateKey = process.env.JWT_SECRET;
	const token = jwt.sign({ id: foundUser.id }, privateKey, {
		expiresIn: '7d',
	});

	res.status(200).json({ token });
};

module.exports = { register, login };
