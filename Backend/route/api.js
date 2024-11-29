const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const upload = require('../middleware/uploadFile')

// User Api 
router.post('/register' , upload.single('profile'), userController.registerUser );
router.post('/login' , userController.loginUser)

module.exports = router;