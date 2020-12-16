const User = require('../models/User');



module.exports = {
    edit: (req, res) => {
        User.findOneAndUpdate(
            {username: req.params.name},
            {$push: {favorites: req.body.favorites}},
            {new:true})
            .then(user => {
                res.json(user)
            })
    },
    deleteFavortie: (req, res) => {
        User.findOneAndUpdate(
            {username: req.params.name},
            {$pull: {favorites: req.body.fav}},
            {new:true})
            .then(user => {
                res.json(user)
            }
        )
    }
}




