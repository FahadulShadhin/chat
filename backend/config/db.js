const mongoose = require('mongoose');
const variables = require('./variables');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(variables.mongoUri);
		console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
	} catch (error) {
		console.log(`Error: ${error.message}`.red.bold);
		process.exit();
	}
};

module.exports = connectDB;
