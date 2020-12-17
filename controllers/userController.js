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
        console.log('Req.body,' + req.body)
        User.findOneAndUpdate(
            {username: req.params.name},
            {$pull: {favorites: {name: req.body}}},
            {multi: true} //sets to remove multiple element
            // {new:true})

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
        )
    }
}




