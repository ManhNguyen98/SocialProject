var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/social');

var db = mongoose.connection;

//User schema
var UserSchema = mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type:String,
    },
    userName:{
        type:String,
        index:true
    },
    passWord:{
        type: String,
    },
    email:{
        type: String,
    },
    status:[
        {
            time: String,
            text: String
        }
    ],
    friends:[
        {
            user: String,
            message: String
        }
    ],
    room:[ 
        {
            roomName :String,
            isCreated : String,
            message : [ 
                {
                    user : String,
                    message : String,
                    time : String
                }
            ]
        }
    ]
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
};

module.exports.getUserByUsername = function(username,callback){
    var query = {userName: username};
    User.findOne(query,callback);
};
module.exports.getEmailByEmailName = function(email,callback){
    var query = {email: email};
    User.findOne(query,callback);
};
module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword, hash ,function(err,isMatch) {
        if(err) throw err;
        callback(null,isMatch);
    });
};

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.passWord, salt, function(err, hash) {
            newUser.passWord = hash;
            newUser.save(callback);
        });
    });
};