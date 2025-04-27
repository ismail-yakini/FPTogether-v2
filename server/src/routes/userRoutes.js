const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');

// router.post('/users', upload.single('image'), userController.createUser);
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
// router.get('/users', userController.getAllUsers);
// router.get('/users/:id', userController.getUserById);

module.exports = router;
