const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
	getAllBooks,
	getBook,
	createBook,
	updateBook,
	deleteBook,
} = require('../controllers/booksController');

const routerBooks = express.Router();

routerBooks.get('/', getAllBooks);
routerBooks.get('/:id', getBook);
routerBooks.post('/', protect, createBook);
routerBooks.put('/:id', protect, updateBook);
routerBooks.delete('/:id', protect, deleteBook);

module.exports = routerBooks;
