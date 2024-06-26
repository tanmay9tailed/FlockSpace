const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');
const usernameValidate = require('../middlewares/usernameValidater');

router.post('/createUser', usernameValidate, validate, userController.createUser);
router.get('/:username',  userController.getUserByUsername);
router.get('/:userId/posts', userController.getUserPosts);

module.exports = router;
