const jwt = require('jsonwebtoken');
const bcyrpt = require('bcryptjs')
let { User } = require('../models/User');

const login = (req, res) => {
    let { email, password } = req.body || {};
    User.findOne({ email : email }).then((user) => {
        if(!user) throw new Error("user not found!");
        if (bcyrpt.compareSync(password, user.password)) {
            var token = jwt.sign({
                _id: user._id, 
                email: user.email, 
                name: user.name,
                username: user.username
            }, 'eventman', { expiresIn: '7d' }) //login session expiring in 7 days.
            return res.status(201).json({
                message: 'Logged In! Use token for authentication of further routes!',
                token: token
            })
        } 
        else {
            return res.status(400).json({
                message: 'Wrong Password!'
            })
        }
    }).catch((err) => {
        return res.status(404).json({"message" : "user not found!"});
    })
};


const AuthController = {
    login
};

module.exports = AuthController;