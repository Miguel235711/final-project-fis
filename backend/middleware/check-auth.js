const jwt = require('jsonwebtoken');

///middleware
module.exports = (req,res,next)=>{
  try{
    /// authorization token , [1] because by convetion we can use Bearer as prefix of of token
    const token = req.headers.authorization.split(" ")[1];
    ///verify token
    ///to check with the secret key if the token was created in our server runtime
    const decodedToken = jwt.verify(token,'secret_key_should_be_longer');
    req.userData = {email: decodedToken.email , userId: decodedToken.userId };
    next();///for next middleware route
  }catch(error){
    res.status(401).json({message: 'You are not authenticated!' });
  }
};
