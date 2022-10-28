const bcyrpt = require('bcryptjs')
let { User } = require('../models/User');
let { Following } = require('../models/Following');
let { Tweet } = require('../models/Tweet');

const register = (req, res) => {
    let { name, username, email, password } = req.body || {};
    const hashPassword = bcyrpt.hashSync(password);
    const userBody = {
        name : name,
        username : username,
        email : email,
        password : hashPassword
    };
    new User(userBody).save().then((user) => {
        return res.status(201).json({"message" : "Registered Successfully!" , user : user });
    }).catch((err) => {
        return res.status(400).json({"message" : "Couldn't Register!" , "error" : err.message});
    })
};

const follow = (req, res) => {
    let { user2Id } = req.body || {}; 
    let user = req.user;
    const followBody = {
        user1 : user._id,
        user2 : user2Id
    }
    new Following(followBody).save().then((data)=>{
        if(!data) throw new Error("User couldn't be followed!");
        return res.status(201).json({"message" : "User has been followed!"});
    }).catch( (err) => {
        return res.status(400).json({"message" : err});
    })
};

const getFollowers = (req, res) => {
    let user = req.user;
    let { pageNumber, limit } = req.body || {};
    Following.find({ user2 : user._id }).skip(limit*pageNumber).limit(limit).then((data) => {
        return res.status(201).json({ "message" : "Request Successful!" , "followers" : data});
    }).catch((err) => { 
        return res.status(500).json({"message" : "Couldn't get Followers!"});
    })
};

const getUserStats = (req, res) => {
    let user = req.user;
    let userStats = {
        name : user.name,
        username : user.username,    
        email : user.email,
        followers : 0,
        tweets : 0,
        followings : 0
    };
    Tweet.countDocuments({ tweetedBy : user._id }).then((count1)=>{
        userStats.tweets = count1;
        Following.countDocuments({ user1 : user._id }).then((count2)=>{
            userStats.followings = count2;
            Following.countDocuments({ user2 : user._id }).then((count3)=>{
                userStats.followers = count3;
                return res.status(201).json({ "userStats" : userStats , "message" : "Request Successful!"})
            }).catch((err)=>{
                return res.status(500).json({"message" : "Couldn't get data!"});
            });
        }).catch((err)=>{
            return res.status(500).json({"message" : "Couldn't get data!"});
        });
    }).catch((err)=>{
        return res.status(500).json({"message" : "Couldn't get data!"});
    });
};

const searchUsers = (req, res) => {
    let { str } = req.body || {} ;
    let s = "";
    for(let i = 0 ;i < str.length ; i++){
        if(str[i]==='_') s+=" ";
        else s+=str[i];
        s+=".*";
    }
    User.find({username : {$regex : s , $options :'i'}}).limit(10).then((list)=>{
        return res.status(201).json({"message" : 1 , users : list});
    }).catch( (err) => {
        return res.status(500).json({"message": "Couldn't get users!"});
    }) 
}

const getTweetsForUser = (req, res) => {
    let { userId , pageNumber, limit } = req.body || {};
    Tweet.find({ tweetedBy : userId }).skip( limit*pageNumber ).limit(limit).then((tweets) => {
        if(!tweets) return res.status(201).json({"message" : "No Tweets Found!" , tweets : []})
        return res.status(201).json({"message" : "Request Successful!", tweets : tweets });
    }).catch( (err) => {
        return res.status(500).json({"message": "Couldn't get Tweets!"});
    })
}

const UserController = {
    register,
    follow,
    getFollowers,
    getUserStats,
    searchUsers,
    getTweetsForUser
};

module.exports = UserController;