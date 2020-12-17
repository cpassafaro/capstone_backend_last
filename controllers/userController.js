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
        // console.log('Req.params.river,' + req.params.river)
        // User.find({username: })
            
        User.findOneAndUpdate(
            {username: req.params.name},
            {$pull: {'favorites': {name: req.params.river}}}, { safe: true, upsert: true },
            function(err, node) {
                if (err) { return handleError(res, err); }
                return res.status(200).json(node.favorites.name);
            })
    }
}




