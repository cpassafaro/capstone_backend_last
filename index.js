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
const commentController = require("./controllers/commentController")


//MIDDLEWARE SETUP
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://hardcore-jackson-68ff7b.netlify.app'],
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


// app.post('/register', async (req, res, next) => {
// 	// console.log('what is going on', req.body);
// 	const desiredUsername = req.body.username
// 	const desiredPassword = req.body.password
// 	const userWithThisUsername = await User.findOne({
// 		username: desiredUsername
// 	})
// 	console.log(userWithThisUsername);
// 	if(userWithThisUsername) {
// 		req.session.message = `Username ${desiredUsername} already taken.`
// 	}
// 	else {
// 		const createdUser = await User.create({
// 			username: desiredUsername,
// 			password: desiredPassword
// 		})
// 		req.session.loggedIn = true
// 		req.session.userId = createdUser._id
// 		req.session.username = createdUser.username
// 		req.session.message = "Thank you for signing up, " + createdUser.username + "."
// 		console.log('successful registration');
// 	}
// })

// // LOGIN
// app.post('/login', async (req, res, next) => {
//   console.log('we are logging in', req.body)
//   const user = await User.findOne({ username: req.body.username })
//   if(!user) {
//     req.session.message = "Invalid username or password."  
//   }
//   else {
//     if(user.password == req.body.password) {
//       console.log('did we make it in here')
//       console.log('we have session', req.session)
//       req.session.loggedIn = true
//       req.session.userId = user._id
//       req.session.username = user.username
//       req.session.message = "Welcome back, " + user.username + "."
//       console.log('after', req.session)
//       res.send(req.session)
//     }
//     else {
//       req.session.message = "Invalid username or password."
//     }
//   }
// })


// // GET USER
// app.get('/getUser', (req, res) => res.send(req.session))






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

//registers users
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
// app.get('/getUser', (req, res) => {
//   console.log(req)
//   console.log('---------------------')
//   console.log(req.sessions)
//   res.send(req.user)
// });

/***************************************************** */



app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(`Check Port: ${app.get("port")}`);
});


//hello