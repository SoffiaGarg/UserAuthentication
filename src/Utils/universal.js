var Cookies = require('js-cookie');


/**
 * 
 * Cookies Related Api
 */
export const setAccessToken = (accessToken)=>{
  try{
    Cookies.set('Authorization',accessToken)
  }catch(error){
      throw new Error("Unable to set the cookie")
  }
}


export const getAccessToken = ()=>{
  try{
    let token = Cookies.get('Authorization');
    if(token) return token;
  }catch(error){
      throw new Error("Unable to set the cookie")
  }
}


export const deleteAccessToken = ()=>{
   Cookies.remove('Authorization');
}


export const validateAccessToken = async()=>{
  let token = getAccessToken();
  if(token){
    let url = "http://localhost:3000/validateToken";
    let loginUser = await fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json','Authorization':token},
    })
    let result = await loginUser.json();
    console.log("result====",result);
    if(result.status === 200){
      return result;
    }else{
      //delete the token from cookie
      //Cookies.remove('Authorization');
    }
  }
     
}