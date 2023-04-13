require('dotenv').config();

const appPort = process.env.APP_PORT;
const mongoUri = process.env.MONGO_URI;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const variables = {
	appPort,
	mongoUri,
	jwtSecretKey,
};

module.exports = variables;
