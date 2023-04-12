require('dotenv').config();

const appPort = process.env.APP_PORT;
const mongoUri = process.env.MONGO_URI;
const variables = {
	appPort,
	mongoUri,
};

module.exports = variables;
