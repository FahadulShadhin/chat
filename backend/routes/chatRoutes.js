const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const {
	accessChat,
	fetchChats,
	createGroupChat,
	renameGroup,
	addToGroup,
	removeFromGroup,
} = require('../controllers/chatControllers');

const router = express.Router();

router.route('/').post(authenticate, accessChat);
router.route('/').get(authenticate, fetchChats);
router.route('/group').post(authenticate, createGroupChat);
router.route('/rename').put(authenticate, renameGroup);
router.route('/groupadd').put(authenticate, addToGroup);
router.route('/groupremove').put(authenticate, removeFromGroup);

module.exports = router;
