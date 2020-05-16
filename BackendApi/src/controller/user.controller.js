import {loginBL, registerBL,getUserBL,verifyToken} from '../BusinessLogic/user.BL';
import {logger} from '../Utils/logger';
import { SuccessMsg, ErrorMsg } from '../Utils/message';
/**
 * ....................................................................................
 * Login Controller
 * .....................................................................................
 * @param {*} req - Email and Password , both email and password will always be there
 * @param {*} res - status (400) = for any error 
 * status(200) - for successfull response.
 * 
 */
export const login = async(req,res)=>{
     try{
      let result = await loginBL(req.body);
      logger.info("login successfull");
      res.send(result);
     }catch(error){
         res.send({
             status:400,
             message:"Server Side Error Occur"+error
         })
     }
}


/**
 * .....................................................................................
 * Register Controller
 * ......................................................................................
 * @param {*} req - name , email and password (for now , no validate on email and password)
 * @param {*} res - send status 200 for postive and 400 for negative response
 */
export const register = async(req,res)=>{
    try{
       let result = await registerBL(req.body);
       logger.info("Registered Successfully");
       res.send(result);
    }catch(error){
        res.send({
            status:400,
            message:"Server Side Error Occur"+error
        })
    }
}


/**
 * ---------------------------------------------------------------------------------------
 * Fetch User Details from Access Token.
 * -----------------------------------------------------------------------------------------
 * @param {} req - Headers - AccessToken
 * @param {*} res 
 */
export const getUser = async(req,res)=>{
    try{
        let result = await getUserBL(req.headers.authorization);
        logger.info("User Details fetch successfully");
        res.send(result);
     }catch(error){
         res.send({
             status:400,
             message:"Server Side Error Occur"+error
         })
     } 
}

/**
 * ------------------------------------------------------------------------------------
 * Validate Access Token
 * ------------------------------------------------------------------------------------
 *  Verify user token , user can'not access any page without authorization
 * 
 * @param  req - Headers (Authorization)
 * @param {*} res 
 */
export const validateAccessToken = async(req,res)=>{
    try{
        let result = await verifyToken(req.headers.authorization);
        if(result){
            logger.info("Token Verified Successfully");
            res.send({
                status:200,
                message:SuccessMsg.TOKEN_VERIFIED,
                data:result
            }); 
        }else{
            logger.warn("Token got Expired");
            res.send({
                status:400,
                message:ErrorMsg.TOKEN_EXPIRED,
                data:result
            }); 
        }
        
    }catch(error){
        res.send({
            status:400,
            message:ErrorMsg.TOKEN_EXPIRED
        })
    }
}