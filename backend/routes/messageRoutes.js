const express = require('express');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();
const {
	sendMessage,
	allMessages,
} = require('../controllers/messageControllers');

router.route('/').post(authenticate, sendMessage);
router.route('/:chatId').get(authenticate, allMessages);

module.exports = router;
