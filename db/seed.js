const Users = require('../models/User')
const Rivers = require('../models/Rivers')
const Notes = require('../models/Note')
const data = require('./userdata.json')
const data2 = require('./riverdata.json')
const data3 = require('./notesdata.json')

const riverData = data2.map(item => {
    let river = {};
    river.title = item.title;
    river.userWaterLevel= item.userWaterLevel;
    river.userWaterLevelDate = item.userWaterLevelDate;
    river.stewardLink = item.stewardLink;
    river.stewardEmblem = item.stewardEmblem;
    river.userComments = item.userComments
    return river
})

Rivers.deleteMany({})
    .then(() => {
        Rivers.create(riverData)
            .then(res => {
                console.log(res)
                process.exit()
            })
            .catch(err => {
                console.log(err)
            })
    })




const userData = data.map(item => {
    let user = {};
    user.username = item.username;
    user.password = item.password;
    user.favorites = item.favorites;
    user.notes = item.notes
    return user
})


Users.deleteMany({})
    .then(() => {
        Users.create(userData)
            .then(res => {
                console.log(res)
                process.exit()
            })
            .catch(err => {
                console.log(err)
            })
    })


const notesData = data3.map(item => {
    let note = {};
    note.author = item.author;
    note.riverName = item.riverName;
    note.note = item.note
    return note
})

Notes.deleteMany({})
    .then(() => {
        Notes.create(notesData)
            .then(res => {
                console.log(res)
                process.exit()
            })
            .catch(err => {
                console.log(err)
            })
    })