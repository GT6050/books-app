require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT;

const app = express();

app.get('/health', (req, res) => {
	res.json({status: "ok"})
});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});
