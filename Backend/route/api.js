const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const upload = require('../middleware/uploadFile'); // Make sure the path is correct

// User API routes
router.post('/register',upload.uploadFiles, userController.registerUser);
router.post('/login', userController.loginUser); // User login

module.exports = router;
