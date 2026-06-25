require('dotenv').config();
const router = require('./src/routes/auth');
const express = require('express');

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use('/auth', router);

app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});
