const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
	getAllReviews,
	createReview,
	deleteReview,
} = require('../controllers/reviewsController.js');

const routerReviews = express.Router({ mergeParams: true });

routerReviews.get('/', getAllReviews);
routerReviews.post('/', protect, createReview);
routerReviews.delete('/:reviewId', protect, deleteReview);

module.exports = routerReviews;
