/**
 * ..............................................................
 *  Creating Express Server on port 3000.
 *  Create the routes for login , register and getUser
 * .............................................................
 */

const express = require('express');
import {login,register,getUser,validateAccessToken} from './controller/user.controller';
var cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/',getUser);
app.get('/validateToken',validateAccessToken);
app.post('/login',login);
app.post('/register',register);

 
app.listen(3000,()=>{
  console.log("Server is Running");
});