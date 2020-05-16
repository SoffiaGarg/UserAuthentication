var jwt = require('jsonwebtoken');
import User from '../Modal/user-modal';
import { logger } from '../Utils/logger';
import {SuccessMsg,ErrorMsg} from '../Utils/message';


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
export const loginBL = async(payload)=>{
    if(!payload.email || !payload.password){
        logger.warn("Some fields are missing in login API")
        throw new Error(ErrorMsg.MISSING_FIELD);
    }
    //else
   let userDetail = await validateEmail(payload.email);
   if(!userDetail){
       return {
           status:401,
           message: ErrorMsg.EMAIL_NOT_FOUND
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
               message:SuccessMsg.LOGIN_SUCCESS,
               data:{
                   token
               }
           }
       }else{
           return {
               status:400,
               message:ErrorMsg.WRONG_PASSWORD
           }
       }
   }
}

/**
 *---------------------------------------------------------------------------------
 Register User
 ..................................................................................
 * @param {} payload 
  - validate request has all the required data.
  - if email already exists send error.
  - otherwise registered user successfully.
 */


export const registerBL = async(payload)=>{
    if(payload.email && payload.password && payload.name){
        let userDetail = await validateEmail(payload.email);
        if(userDetail){
            return{
                status:400,
                message:ErrorMsg.EMAIL_ALREADY_EXISTS
            }
        }else{
           await User.add(payload);
            return{
                status:200,
                message:SuccessMsg.REGISTER_SUCCESS
            }
        }
    }else{
        throw new Error(ErrorMsg.MISSING_FIELD)
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
export const getUserBL = async(token)=>{
    let isVerified = await verifyToken(token);
    if(!isVerified.data){
        return{
            status:400,
            message:ErrorMsg.TOKEN_EXPIRED
        }
    }
    //if token is valid then get the user from the database
    else{
        let userDetail = await User.get({
            token
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
                 message:ErrorMsg.TOKEN_EXPIRED
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
const validateEmail = async(email)=>{
    let userDetail = await User.get({email});
    return userDetail;
}


export const verifyToken = async(token)=>{
    let result = jwt.verify(token, 'nodeReactApp',(err,res)=>{
        if(res){
            return res;
        }
    });
    return result;
}

//Update access token , after every successfull login
const updateAccessToken = async(email,token)=>{
    await User.updateOne({
        email,
    },{
        $set:{
            token
        }
    })
}