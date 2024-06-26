const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const createPostValidater = require('../middlewares/createPostValidater');
const validate = require('../middlewares/validate');
const likeValidate = require('../middlewares/likeValidater');
const commentValidate = require('../middlewares/commentValidater');

router.post('/createPost', postController.upload, postController.createPost);
router.get('/feed', postController.getFeed);
router.post('/post/:postId/like', likeValidate, validate, postController.likePost);
router.post('/post/:postId/comment', commentValidate, validate, postController.commentOnPost);

module.exports = router;
