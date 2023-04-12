const express = require('express');
const chats = require('./data/data');
const variables = require('./config/variables');
const connectDB = require('./config/db');
const colors = require('colors');

connectDB();
const app = express();
const PORT = variables.appPort || 3000;

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.get('/api/chat', (req, res) => {
	res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
	const chat = chats.find((c) => c._id === req.params.id);
	res.send(chat);
});

app.listen(
	PORT,
	console.log(`Server started at PORT ${variables.appPort}`.yellow.bold)
);
