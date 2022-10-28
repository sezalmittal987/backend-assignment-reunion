const express = require("express");
const router = express.Router();
const TweetController = require('../controllers/tweet.controller');
const authenticate = require('../authenticate');

// Create routes for product here
router.post('/tweet' , authenticate , TweetController.tweet );
router.post('/deleteTweet' , authenticate , TweetController.deleteTweet );
router.put('/likeTweet' , authenticate , TweetController.likeTweet );

module.exports = router;