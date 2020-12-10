const Notes = require('../models/Note')


module.exports = {
    create: (req, res) => {
        console.log(req)
        Notes.create(req.body)
            .then(notes => {
                console.log(req.body)
                res.json(notes)
            })
    },
    delete: (req, res) => {
        Notes.findOneAndDelete({note: req.params.body})
            .then(notes => {
                res.json(notes)
            })
    },
    getByAuthor: (req, res) => {
        Notes.find({author: req.params.name})
            .then(notes => {
                res.json(notes)
            })
    },
    getByAuthorAndRiver: (req, res) => {
        Notes.find({author: req.params.name, riverName: req.params.river})
            .then(notes => {
                res.json(notes)
            })
    },
}