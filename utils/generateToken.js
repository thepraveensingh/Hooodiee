const jwt = require("jsonwebtoken");

const generateToken = (createdUser) => {
  return jwt.sign({email : createdUser.email, id : createdUser._id },"PROCESS.ENV.JWT_KEY" );
}



module.exports = generateToken;