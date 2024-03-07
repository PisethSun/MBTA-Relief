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
<<<<<<< HEAD

// Favorite Routes
const favoriteGetAll = require('./routes/favoriteGetAll')
const byfavbID = require('./routes/byfavbID')
=======
>>>>>>> c21c52798cffa5a7d165e18945fd2ab5543320b6

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
<<<<<<< HEAD

// Route Connection Favorite
app.use('/favorite',favoriteGetAll)
app.use('/findFavbyID',byfavbID)
=======
>>>>>>> c21c52798cffa5a7d165e18945fd2ab5543320b6

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
