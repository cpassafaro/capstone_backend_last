const mongoose = require('../db/connection');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema ({
    username: {
        type:String,
        required:true,
        trim:true,
    },
    password: {
        type:String,
        required:true,
        trim:true,
    },
    picture: String,
    favorites: [],
},{
    timestamps:true
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
module.exports = User;