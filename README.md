## Backend of Boater Beta Project

## Deployed URL
https://boatertalk.herokuapp.com/


### Description
API was created using the frameworks Node.js and express, the database Mongodb in conjuction with the library mongoose. Testing was done with the application postman. Four models were built to support storing information in separate mongo databases. Authentication was done with simple JSON web tokens in conjuction with express and mongoose find functionality. The user model is used to save user login information and the users favorite rivers. The note model is used to store notes for the user. This populates its own database. The River model was created to store updated information about rivers that is given by a specific user. The comment model was created to access comments made about each river. This information will be used in conjunction with information from the usgs api. Data was not seeded from usgs api due to the fact that updates occur to that api every two hours, so to recieve newest information we will be pulling directly from there. Controllers were used to break up functionality for ease of navigation. 

## CRUD Routes

| URL | Method | Description |
|-----|--------|-------------|
| "/" | GET    | List all of the users in the DB |
| "/register" | POST |  Creates a new user |
| "/login | POST | Logs in a user|
| 'getUser' | GET | Retrieves logged in user information |
| "/favorites/:name/:fav | PUT | Name is the users name and fav is the body of the favorite element that you would like to delete out of the array |
| "/favorites/:name" | PUT | Name is the users name and then the request body adds favorties to the favorties array |
| "/notes.getauthor/:name/:river" | GET | Gets the notes from the db that correlate to a specific username and river |
| "/notes/:body" | DELETE | Deletes a note by the body of the note |
| "/notes/create | CREATE | Creates a new note for the db |
| "river/:name | GET | Gets information by river name |
| "river/updatewater/:name" | PUT | Finds river by name and then updates body. Meant for water level |
| "river/deleteComment/:name/:userComments" | PUT | This path can delete a user comment that has been added to the river schema, they are stored in an array so that is why it is not a delete element |
|"river/addComment/:name" | PUT | This path adds a comment to the river Schema |
|'/comment/:name' | GET | This path gets comments for a specific river name |
|'/comment/create' | POST | This adds a comment to the comment db with a specified river name |


### Model
```
const userSchema = new Schema ({
    username: {
        type:String,
        required:true,
        trim:true,
    },
    password: {
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    picture: String,
    favorites: [],
},{
    timestamps:true
});
```

```
const riverSchema = new Schema({
    title: String,
    userWaterLevel: Number,
    userWaterLevelDate: {type: Date, default: Date.now},
    stewardLink: String,
    stewardEmblem: String,
    userComments: []
})
```

```
const noteSchema = new Schema({
    author: {
        type:String,
        required:true,
        trim:true,
    },
    riverName:{
        type:String,
        required:true,
        trim:true,
    },
    note:String,
    date: {type:Date, default: Date.now}
})
```

```

const commentSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    commentDate: {type: Date, default: Date.now},
    userComments: String
})
```