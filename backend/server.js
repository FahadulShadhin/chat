const express = require('express');
const colors = require('colors');
const variables = require('./config/variables');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

connectDB();
const app = express();
const PORT = variables.appPort || 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(
	PORT,
	console.log(`Server started at PORT ${variables.appPort}`.yellow.bold)
);
