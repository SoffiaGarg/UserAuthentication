import {loginBL, registerBL,getUserBL,verifyToken} from '../businessLogic/user.BL';

/**
 * ....................................................................................
 * Login Controller
 * .....................................................................................
 * @param {*} req - Email and Password , both email and password will always be there
 * @param {*} res - status (400) = for any error 
 * status(200) - for successfull response.
 * 
 */
export const login = (req,res)=>{
     try{
      let result = loginBL(req.body);
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
export const register = (req,res)=>{
    try{
       let result = registerBL(req.body);
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
export const getUser = (req,res)=>{
    try{
        console.log(req.headers,"====");
        let result = getUserBL(req.headers.authorization);
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
export const validateAccessToken = (req,res)=>{
    try{
        let result = verifyToken(req.headers.authorization);
        console.log("my result==",result);
        if(result){
            res.send({
                status:200,
                message:'Token verified',
                data:result
            }); 
        }else{
            res.send({
                status:400,
                message:'Token expired',
                data:result
            }); 
        }
        
    }catch(error){
        res.send({
            status:400,
            message:"Token expired"
        })
    }
}