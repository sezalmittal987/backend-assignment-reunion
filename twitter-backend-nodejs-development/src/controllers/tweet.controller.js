const { User } = require('../models/User');
const { Tweet } = require('../models/Tweet');

const tweet = (req, res) => {
    let { text} = req.body || {};
    let user = req.user;
    const tweetBody = {
        tweetedBy : user._id,
        date : Date.now(),
        text : text
    };
    new Tweet(tweetBody).save().then( (tweet) => {
        return res.status(201).json({"message" : `Tweet : ${text} is successfully tweeted by user: ${user.username}`, tweet : tweet });
    }).catch((err) => {
        return res.status(400).json({"message" : "Couldn't tweet!"});
    })
};

const deleteTweet = (req, res) => {
    let { tweetId } = req.body || {};
    try{
        Tweet.findOneAndRemove({_id : tweetId }).exec((err , resp)=>{
            if(err) return res.status(400).json({"message" : "Couldn't delete tweet!"});
            return res.status(201).json({"message" : 'Tweet has been successfully deleted!' });
        })
    }catch(err){
        return res.status(400).json({"message" : "Couldn't delete tweet!"});
    }
};

const likeTweet = (req, res) => {
    let { tweetId } = req.body || {};
    Tweet.findOneAndUpdate({ _id : tweetId }, { $inc : { likes : 1 } }).then((tweet) => {
        return res.status(201).json({"message" : 'Tweet has been liked!' });
    }).catch((err) => {
        return res.status(400).json({"message" : "Couldn't delete tweet!", "error" : err });
    })
};

const NotesController = {
    tweet,
    deleteTweet,
    likeTweet
};

module.exports = NotesController;