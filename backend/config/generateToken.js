const jwt = require('jsonwebtoken');
const variables = require('./variables');

const generateToken = (id) => {
	return jwt.sign({ id }, variables.jwtSecretKey, {
		expiresIn: '30d',
	});
};

module.exports = generateToken;
