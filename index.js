const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("./models/User");
const app = express();
const jwt = require('jwt-simple');
const userController = require("./controllers/userController");
const notesController = require("./controllers/notesController");
const riverController = require("./controllers/riversController");
const commentController = require("./controllers/commentController");
let secret = "asdof97h07y4t3";


//MIDDLEWARE SETUP
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//middleware function
function isAuthenticated(req, res, next) {
  console.log(req.headers)
  if(req.headers.authorization){
      try{
          console.log("User has token");
          let token = req.headers.authorization.split("Bearer ")[1];
          console.log(token);
        let accessToken = jwt.decode(token, secret);
        req.accessToken = accessToken
        return next();
      }catch(err){
          console.log(err);
          console.log("There is something wrong with your token");
          res.sendStatus(401)
      }
  }else{
      res.sendStatus(401)
      // console.log('error')
  }
}




app.use(
  session({
    // We will use secret in our cookie-parser
    secret: "this will be our secret code",
    resave: true,
    saveUninitialized: true
  })
);
// app.use(cookieParser("this will be our secret code"));
// app.use(passport.initialize());
// app.use(passport.session());
// require("./controllers/auth")(passport);

// ROUTES ALL

//COMMENT ROUTES
//gets comments by river name
app.get('/comment/:name', commentController.getComments)
//adds a comment
app.post('/comment/create', commentController.createComments)


//RIVER ROUTES
//this route adds new user comment to array
app.put('/river/addComment/:name', riverController.addComment)
//path to delete a user comment
app.put('/river/deleteComment/:name/:userComments', riverController.deleteComment)
//this path updates the water level
app.put('/river/updatewater/:name', riverController.updateWaterLevel)
//this path gets river info by name
app.get('/river/:name', riverController.information)
//this path creates a new river
app.post('/river/create', riverController.create)


//NOTES ROUTES
app.post('/notes/create', notesController.create);
app.delete('/notes/:body', notesController.delete)
app.get('/notes/getauthor/:name', notesController.getByAuthor)
app.get('/notes/getauthor/:name/:river', notesController.getByAuthorAndRiver)



//USER ROUTES
//route for adding an element to the favorites array
app.put('/favorites/:name', userController.edit)
//route for deleting an element from the favorties array
app.put('/favorites/:name/:fav', userController.deleteFavortie)

/////////////******************************************* */
//function to login users
// app.post("/login", (req, res, next) => {
//   // use local strategy we defined
//     User.find({username:req.body.username}).then(userFind =>{ 
//       console.log(userFind)
//         passport.authenticate("local", (err, user) => {
//             if (err) console.log(err);
//             if (userFind.length != 1) {
//               res.send("Username is incorrect");
//             } else if (user == false) {
//               res.send("Password is incorrect");
//             } else {
//               req.login(user, (err) => {
//                 if (err) throw err;
//                 res.send("Successfully Authenticated");
//               });
//             }
//           })(req, res, next);
//         })
// });

// registers users
// app.post("/register", (req, res) => {
//   User.findOne({ username: req.body.username }, async (err, doc) => {
//     if (err) throw err;
//     if (doc) res.send("User Already Exists");
//     if (!doc) {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);
//       const newUser = new User({
//         username: req.body.username,
//         password: hashedPassword,
//       });
//       await newUser.save();
//       res.send("User Created");
//     }
//   });
// });

// req.user stores the user
// req object will not be a user object containing session data
// accessible throughout whole app
app.get('/getUser', isAuthenticated, (req, res) => {
  console.log(req.accessToken)
  User.findOne({_id: req.accessToken.id}).then(user => res.json(user))
  // res.send(req.user)
});

/***************************************************** */


app.post('/register', (req, res) => {
  if (req.body.username && req.body.password) {
    let newUser = {
      username: req.body.username,
      password: req.body.password
    }
    console.log(newUser);
    User.findOne({ username: req.body.username })
      .then((user) => {
          console.log("29: ",user);
        if (!user) {
          console.log("creating new user")
          User.create(newUser)
            .then(user => {
              if (user) {
                var payload = {
                  id: newUser.id,
                  userIsLoggedIn:true
                }
                var token = jwt.encode(payload, secret)
                res.json({
                  token: token
                })
              } else {
                res.sendStatus(401)
              }
            })
        } else {
          res.sendStatus(401)
        }
      })
  } else {
    res.sendStatus(401)
  }
})

app.post('/login', (req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username}).then(user => {
      if (user) {
          console.log(user.id);
        if (user.password === req.body.password) {
          var payload = {
            id: user.id,
            userIsLoggedIn:true,
            access:"basic-user"
          }
          var token = jwt.encode(payload, secret)
          res.json({
            token: token,
            loggedIn:true,
            username:req.body.username
          })
        } else {
          res.sendStatus(401)
        }
      } else {
        res.sendStatus(401)
      }
    })
  } else {
    res.sendStatus(401)
  }
})

app.get('/logout', (req, res) => {
  res.send({ hello: 'World' })
})

app.get('/private', isAuthenticated,
(req, res) => {
  res.json({loggedIn:true})
}
);
app.get('/user',
//connectEnsureLogin.ensureLoggedIn(),

(req, res) => res.send({user: req.user})
);


app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(`Check Port: ${app.get("port")}`);
});


//hello


// app.use(bodyParser.json());
// app.use(express.json());
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://hardcore-jackson-68ff7b.netlify.app'],
//   methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
//   credentials: true
// }));