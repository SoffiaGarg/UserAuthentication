import {userData} from '../../database/user-db'
var jwt = require('jsonwebtoken');



/**
 * ...............................................................................
 * User Login
 * .................................................................................
 * File System-
 * Right now we are not connecting with database , so saving the data in the user-db.js.
 * 
 *  - if email is present in db , if no then send error message to user "Please signUp with this email".
 *  - if email valid but password is incorrect , send the error message with status 400.
 *  - if email and password is correct , then create a access token for future authrization
 */
export const loginBL = (payload)=>{
   let userDetail = validateEmail(payload.email);
   if(!userDetail){
       return {
           status:401,
           message:"Email not found , please sign up first"
       }
   }else{
       if(userDetail.password === payload.password){
           let token =  jwt.sign({
               exp: Math.floor(Date.now() / 1000) + (60 * 60), //expire after 1 hour
               data:payload.email
           },'nodeReactApp')
          //update the access token to the db.
         updateAccessToken(userDetail.email,token);
           return {
               status:200,
               message:"Login Successfull",
               data:{
                   token
               }
           }
       }else{
           return {
               status:400,
               message:"Password is Incorrect"
           }
       }
   }
}

/**
 *---------------------------------------------------------------------------------
 Register User
 ..................................................................................
 * @param {} payload 

  - if email already exists send error.
  - otherwise registered user successfully.
 */


export const registerBL = (payload)=>{
    let userDetail = validateEmail(payload.email);
   if(userDetail){
       return{
           status:400,
           message:"Email Already Exists."
       }
   }else{
       userData.push(payload);
       return{
           status:200,
           message:"User Registered Successfully"
       }
   }
}

/**
 * -----------------------------------------------------------------------
 * Get User
 * .........................................................................
 * 
 * From access token , find the user data;
 * @param {} token 
 */
export const getUserBL = (token)=>{
    let isVerified = verifyToken(token);
    if(!isVerified.data){
        return{
            status:400,
            message:"Access Token Expired"
        }
    }
    //if token is valid then get the user from the database
    else{
        let userDetail= userData.find((user)=>{
            if(user.token===token){
                return user;
            }
         })
         if(userDetail){
             return{
                 status:200,
                 message:"success",
                 data:userDetail
             }
         }else{
             return{
                 status:400,
                 message:"Access Token Expired"
             }
         }
    }
    
}


/**
 * 
 * Validate Checks
 * - validateEmail - if email already exists or not.
 * - verifyToken - check if token is valid or not.
 * 
 */
const validateEmail = (email)=>{
    let userDetail= userData.find((user)=>{
       if(user.email===email){
           return user;
       }
    })
    return userDetail;
}


export const verifyToken = (token)=>{
    let result = jwt.verify(token, 'nodeReactApp',(err,res)=>{
        if(res){
            return res;
        }
    });
    return result;
}

//Update access token , after every successfull login
const updateAccessToken = (email,token)=>{
      userData.map((user)=>{
        if(user.email === email){
            user.token = token;
            return user;
        }else return user
    })
}