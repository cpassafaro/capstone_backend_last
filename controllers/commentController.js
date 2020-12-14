const Comment = require('../models/Comment')


module.exports = {
    deleteComment: (req, res) => {
        Comment.findOneAndUpdate(
            {title: req.params.name},
            req.body,
            {new:true})
            .then(user => {
                res.json(user)
            }
        )
    },
    createComments: (req, res) => {
        console.log(req)
        Comment.create(req.body)
            .then(notes => {
                console.log(req.body)
                res.json(notes)
            })
    },
    getComments: (req,res) => {
        Comment.findOne({title: req.params.name})
            .then((rivers) => {
                res.json(rivers)
            })
    },
}