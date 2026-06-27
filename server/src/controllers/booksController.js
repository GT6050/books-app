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

//method GET: getting one book by id /books/:id
const getBook = async (req, res) => {
	try {
		const bookId = req.params.id;

		if (isNaN(bookId)) {
			return res.status(400).json({ message: 'Invalid book id' });
		}

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

		if (!title || !author || !genre || !description) {
			return res
				.status(400)
				.json({ message: 'Title, author, genre and description are required' });
		}

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

//method PUT: update a book by id /books/:id
const updateBook = async (req, res) => {
	try {
		const bookId = req.params.id;
		if (isNaN(bookId)) {
			return res.status(400).json({ message: 'Invalid book id' });
		}

		const { title, author, genre, description, cover_image } = req.body;
		if (!title || !author || !genre || !description) {
			return res
				.status(400)
				.json({ message: 'Title, author, genre and description are required' });
		}

		const bookCheck = await pool.query('SELECT * FROM books WHERE id=$1', [
			bookId,
		]);

		if (bookCheck.rows.length === 0) {
			return res.status(404).json({ message: 'Book not found' });
		}

		if (bookCheck.rows[0].created_by !== req.user.id) {
			return res
				.status(403)
				.json({ message: 'Not authorized to modify this book' });
		}

		const result = await pool.query(
			'UPDATE books SET title=$1, author=$2, genre=$3, description=$4, cover_image=$5 WHERE id=$6 RETURNING *',
			[title, author, genre, description, cover_image, bookId],
		);

		return res
			.status(200)
			.json({ book: result.rows[0], message: 'Book updated' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

//method DELETE: delete a book by id /books/:id
const deleteBook = async (req, res) => {
	try {
		const bookId = req.params.id;
		if (isNaN(bookId)) {
			return res.status(400).json({ message: 'Invalid book id' });
		}

		const bookCheck = await pool.query('SELECT * FROM books WHERE id=$1', [
			bookId,
		]);
		if (bookCheck.rows.length === 0) {
			return res.status(404).json({ message: 'Book not found' });
		}

		if (bookCheck.rows[0].created_by !== req.user.id) {
			return res
				.status(403)
				.json({ message: 'Not authorized to delete this book' });
		}

		const result = await pool.query(
			'DELETE FROM books WHERE id=$1 RETURNING *',
			[bookId],
		);
		return res.status(200).json({ message: 'Book deleted' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook };
