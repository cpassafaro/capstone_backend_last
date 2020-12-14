const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportlocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const { deserializeUser } = require("passport");
const User = require("./models/User");
const app = express();
const LocalStrategy = require("passport-local").Strategy;
const userController = require("./controllers/userController");
const notesController = require("./controllers/notesController")
const riverController = require("./controllers/riversController")


//MIDDLEWARE SETUP
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: ['https://boatertalk.herokuapp.com/','http://localhost:3000', 'http://localhost:3001'],
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));



app.use(
  session({
    // We will use secret in our cookie-parser
    secret: "this will be our secret code",
    resave: true,
    saveUninitialized: true
  })
);
app.use(cookieParser("this will be our secret code"));
app.use(passport.initialize());
app.use(passport.session());
require("./controllers/auth")(passport);

// ROUTES ALL

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
//function to login users
app.post("/login", (req, res, next) => {
  // use local strategy we defined
    User.find({username:req.body.username}).then(userFind =>{ 
      console.log(userFind)
        passport.authenticate("local", (err, user) => {
            if (err) console.log(err);
            if (userFind.length != 1) {
              res.send("Username is incorrect");
            } else if (user == false) {
              res.send("Password is incorrect");
            } else {
              req.login(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
              });
            }
          })(req, res, next);
        })
});

//registers users
app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

//route gets all users
app.get("/", (req, res) =>
  User.find({}).then((user) => {
    res.json(user);
  })
);

// req.user stores the user
// req object will not be a user object containing session data
// accessible throughout whole app
app.get('/getUser', (req, res) => {
  console.log(req)
  console.log('---------------------')
  console.log(req.sessions)
  res.send(req.user)
});

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(`Check Port: ${app.get("port")}`);
});


//hello