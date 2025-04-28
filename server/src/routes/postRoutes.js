const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

const authenticateToken = require('../middleware/authenticateToken');


router.post('/createpost', authenticateToken, postController.createPost);
router.get('/posts', authenticateToken, postController.getAllPosts);

module.exports = router;
