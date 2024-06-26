const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')


// Start Favorites Routes
const favoriteGetAll = require('./routes/favoriteGetAll')
const addNewFavoriteRoute = require('./routes/favoriteNew')
const editTheFavRoute = require('./routes/favoriteEditById')
const deleteTheFavRoute = require('./routes/favoriteDeleteById')
const deleteAllFav = require('./routes/favoriteDeleteAll')
// End of Favorites Routes

//start of rating routes
const deleteAllRatings = require('./routes/ratingsDeleteAll')
const getAllRatings = require('./routes/ratingsGetAllRatings')
const createRating = require('./routes/ratingCreateRating')
const updateRating = require('./routes/ratingUpdateRating')
const getRatingById = require('./routes/ratingsGetRatingsById')
const deleteRatingById = require('./routes/ratingDeleteById')
const getRatingByStation = require('./routes/ratingGetRatingByStation')
//End of rating routes


// Start of Comment Routes
const deleteAllComments = require('./routes/commentDeleteAll')
const getAllComments = require('./routes/commentGetAll')
const getCommentById = require('./routes/commentGetById')
const createComment = require('./routes/commentCreate')
const commentDeleteById = require('./routes/commentDeleteById')
const commentEditById = require('./routes/commentEditById')
const getCommentBystation = require('./routes/commentSearchByStation')
// End of Comment Routes

require('dotenv').config();
const SERVER_PORT = 8081

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)

// Start Favorites Routes
app.use('/favorite', favoriteGetAll)
app.use('/favorite', addNewFavoriteRoute)
app.use('/favorite', editTheFavRoute)
app.use('/favorite', deleteTheFavRoute)
app.use('/favorite', deleteAllFav)

// End of Favorites Routes

// start of rating routes
app.use('/rating',deleteAllRatings)
app.use('/rating',getAllRatings)
app.use('/rating',createRating)
app.use('/rating',updateRating)
app.use('/rating',getRatingById)
app.use('/rating',deleteRatingById)
app.use('/rating',getRatingByStation)
// end of rating routes

// Start of Comment Routes
app.use('/comment',deleteAllComments)
app.use('/comment',getAllComments)
app.use('/comment',getCommentById)
app.use('/comment',createComment)
app.use('/comment',commentDeleteById)
app.use('/comment',commentEditById)
app.use('/comment', getCommentBystation)
// End of Comment Routes



app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
