const mongoose = require('../db/connection')

const Schema = mongoose.Schema;

const riverSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    userWaterLevel: Number,
    userWaterLevelDate: {type: Date, default: Date.now},
    stewardLink: String,
    stewardEmblem: String,
    userComments: []
})

const River = mongoose.model('River', riverSchema);
module.exports = River;