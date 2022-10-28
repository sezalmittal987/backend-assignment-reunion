
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let followingSchema = new Schema({ 
    user1 : {                           //  FOLLOWER
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    user2 : {
        type : Schema.Types.ObjectId,   // FOLLOWING    
        ref : 'User',
    },
})

const Following = mongoose.model('Following', followingSchema);
module.exports = {
    Following,
}
