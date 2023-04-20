const express = require('express');
const {
	registerUser,
	authenticateUser,
	allUsers,
} = require('../controllers/userControllers');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(authenticate, allUsers);
router.route('/').post(registerUser);
router.route('/login').post(authenticateUser);

module.exports = router;
