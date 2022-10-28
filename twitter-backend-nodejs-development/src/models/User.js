// User Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({ 
    username : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
    },
    email : {
        type : String,
        requried : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
})

const User = mongoose.model('User', userSchema);
module.exports = {
    User,
}
