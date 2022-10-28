//Tweet Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tweetSchema = new Schema({ 
    tweetedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    date : {
        type : String,
        requried : true,
    },
    text : {
        type : String,
        required : true,
    },
    likes : {
        type : Number,
        default : 0
    }
})

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = {
    Tweet,
}
