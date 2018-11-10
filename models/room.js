var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/social");

var UserSchema = mongoose.Schema({
    roomName:{
        type: String,
    },
    chat:{
        type: String,
    }
});

var Room = module.exports = mongoose.model("Room", UserSchema);

module.exports.createRoom = function(newRoom,callback){
    newRoom.save(callback);
};