require('dotenv').config();
const router = require('./src/routes/auth');
const routerBooks = require('./src/routes/books');
const express = require('express');

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use('/auth', router);
app.use('/books', routerBooks);

app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});
