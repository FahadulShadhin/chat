const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const variables = require('../config/variables');
const asyncHandler = require('express-async-handler');

const authenticate = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.replace('Bearer ', '');
			const userData = jwt.verify(token, variables.jwtSecretKey);
			req.user = await User.findById(userData.id).select('-password');
			next();
		} catch (error) {
			res.status(401);
			throw new Error('Not authorized, token failed');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

module.exports = authenticate;
