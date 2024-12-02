const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const upload = require('../middleware/uploadFile'); // Make sure the path is correct
const authenticate = require('../middleware/auth');
const blogController = require('../controller/blogController');
// User API routes
router.post('/register',upload.uploadFiles, userController.registerUser);
router.post('/login', userController.loginUser); // User login

// Blog Api routes

router.post('/create', authenticate , upload.uploadFiles , blogController.createBlog);

module.exports = router;
