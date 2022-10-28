const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user.controller');
const authenticate = require('../authenticate');

// Create routes for user here
router.post('/register' ,  UserController.register );
router.put('/follow' , authenticate , UserController.follow );
router.get('/getFollowers' , authenticate , UserController.getFollowers );
router.get('/getTweetsForUser' , authenticate , UserController.getTweetsForUser );
router.get('/getUserStats' , authenticate , UserController.getUserStats );
router.get('/searchUsers' , authenticate , UserController.searchUsers );

module.exports = router;