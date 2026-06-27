require('dotenv').config();
const router = require('./src/routes/auth');
const routerBooks = require('./src/routes/books');
const routerReviews = require('./src/routes/reviews');
const cors = require('cors');
const express = require('express');

const PORT = process.env.PORT;

const app = express();
app.use(
	cors({
		origin: process.env.CLIENT_URL,
	}),
);

app.use(express.json());
app.use('/auth', router);
app.use('/books', routerBooks);
app.use('/books/:bookId/reviews', routerReviews);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Something went wrong' });
});

app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});
