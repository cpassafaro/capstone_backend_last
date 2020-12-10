const mongoose = require('../db/connection')
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    author: {
        type:String,
        required:true,
        trim:true,
    },
    riverName:{
        type:String,
        required:true,
        trim:true,
    },
    note:String,
    date: {type:Date, default: Date.now}
})

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;