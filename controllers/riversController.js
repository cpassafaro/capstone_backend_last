const Rivers = require('../models/Rivers')


module.exports = {
    addComment: (req, res) => {
        Rivers.findOneAndUpdate(
            {title: req.params.name},
            {$push: {userComments: req.body.userComments}},
            {new:true})
            .then(user => {
                res.json(user)
            })
    },
    deleteComment: (req, res) => {
        Rivers.findOneAndUpdate(
            {title: req.params.name},
            {$pull: {userComments: req.params.userComments}},
            {new:true})
            .then(user => {
                res.json(user)
            }
        )
    },
    updateWaterLevel: (req, res) =>{
        Rivers.findOneAndUpdate({ title: req.params.name }, req.body, {new: true})
        .then((rivers) => {
            res.json(rivers)
        })
    },
    information: (req,res) => {
        Rivers.findOne({title: req.params.name})
            .then((rivers) => {
                res.json(rivers)
            })
    },
    create: (req, res) => {
        console.log(req)
        Rivers.create(req.body)
            .then(notes => {
                console.log(req.body)
                res.json(notes)
            })
    },
}