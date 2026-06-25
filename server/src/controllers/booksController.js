const pool = require('../../db/index');

//method GET: getting all the books /books
const getAllBooks = async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM books');
		return res.status(200).json({ books: result.rows });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

//method GET: getting one books by id of the book /books/:id
const getBook = async (req, res) => {
	const bookId = req.params.id;
	try {
		const result = await pool.query('SELECT * FROM books WHERE id = $1', [
			bookId,
		]);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Book not found' });
		}
		return res.status(200).json({ book: result.rows[0] });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

//method POST: creating a book /books
const createBook = async (req, res) => {
	try {
		const { title, author, genre, description, cover_image } = req.body;
		const userId = req.user.id;
		const result = await pool.query(
			'INSERT INTO books (title, author, genre, description, cover_image, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
			[title, author, genre, description, cover_image, userId],
		);

		return res.status(201).json({ book: result.rows[0] });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

//method PUT/ later PATCH: update a book by id /books/:id
const updateBook = async (req, res) => {
	try {
		const bookId = req.params.id;
		const { title, author, genre, description, cover_image } = req.body;
		const result = await pool.query(
			'UPDATE books SET title=$1, author=$2, genre=$3, description=$4, cover_image=$5 WHERE id=$6 RETURNING *',
			[title, author, genre, description, cover_image, bookId],
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Book not found' });
		}
		return res.status(200).json({ book: result.rows[0], message: "Book updated" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

//method DELETE: delete a book by id /books/:id
const deleteBook = async (req, res) => {
	try {
		const bookId = req.params.id;
		const result = await pool.query(
			'DELETE FROM books WHERE id=$1 RETURNING *',
			[bookId],
		);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Book not found' });
		}
		return res.status(200).json({ message: 'Book deleted' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook };
