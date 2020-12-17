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
            {$pull: {favorites: {name: req.params.river}}}, { safe: true, upsert: true },
            // {multi: true} //sets to remove multiple element
            // {new:true})
            function(err, node) {
                if (err) { return handleError(res, err); }
                return res.status(200).json(node.configuration.links);
            });

    //         { $pull: { results: { $elemMatch: { score: 8 , item: "B" } } } }, // item(s) to match from array you want to pull/remove
    // { multi: true }
            // .then(user => {
            //     res.send(user) 
                // console.log(res)
                // let index = ''
                // let fav = user.favorites
                // for(let i =0; i< fav.length; i++){
                //     if(fav[i] == req.body.fav){
                //         let index = i
                //         return index
                //     }
                //     return index
                // }
                // console.log(index)
            // })
        // )
    }
}




