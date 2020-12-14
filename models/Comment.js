const mongoose = require('../db/connection')

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    commentDate: {type: Date, default: Date.now},
    userComments: String
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;