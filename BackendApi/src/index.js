/**
 * ..............................................................
 *  Creating Express Server on port 3000.
 *  Create the routes for login , register and getUser
 * .............................................................
 */

const express = require('express');
import {login,register,getUser,validateAccessToken} from './controller/user.controller';
import dbConnection from './Database/db';
var cors = require('cors');
const app = express();
import {PORT} from './Config/config';
import {logger} from './Utils/logger';

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/getUser',getUser);
app.get('/validateToken',validateAccessToken);
app.post('/login',login);
app.post('/register',register);

dbConnection();
app.listen(PORT,()=>{
 logger.info("Server is Running at port "+PORT)
});