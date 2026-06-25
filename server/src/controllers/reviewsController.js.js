const pool = require('../../db/index');

const getAllReviews = async (req, res) => {
	try {
		const bookId = req.params.bookId;
		const result = await pool.query('SELECT * FROM reviews WHERE book_id=$1', [
			bookId,
		]);
		return res.status(200).json({ reviews: result.rows });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

const createReview = async (req, res) => {
	try {
		const bookId = req.params.bookId;
		const { rating, comment } = req.body;
		const userId = req.user.id;

		const result = await pool.query(
			'INSERT INTO reviews (book_id, user_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
			[bookId, userId, rating, comment],
		);

		return res.status(201).json({ review: result.rows[0] });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

const deleteReview = async (req, res) => {
	try {
		const bookId = req.params.bookId;
		const reviewId = req.params.reviewId;
		const result = await pool.query(
			'DELETE FROM reviews WHERE id=$1 AND book_id=$2 RETURNING *',
			[reviewId, bookId],
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Review not found' });
		}

		return res.status(200).json({ message: 'Review deleted' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

module.exports = { getAllReviews, createReview, deleteReview };
