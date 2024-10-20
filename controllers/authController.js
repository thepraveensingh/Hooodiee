const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {} = require('../utils/generateToken');
const generateToken = require('../utils/generateToken');
const productModel = require('../models/productModel')
const isLoggedIn = require('../middlewares/isLoggedIn')
const upload = require('../config/multerConfig')

module.exports.registerUser = async(req,res)=>{
  try{
    let{email ,fullName,password} = req.body;

    let user = await userModel.findOne({email : email});
    if(user) 
      return res.status(401).send("you already have an account,please login")

    bcrypt.genSalt(12,(err,salt)=>{
      bcrypt.hash(password,salt,async(err,hash)=>{
        if(err){
          return res.send(err.message);
        }
        else{  let createdUser = await userModel.create({
            email,
            fullName,
            password : hash
          });
          // res.send(createdUser);
          let token = generateToken(createdUser);
          res.cookie('token',token);
          res.redirect('/');
        }

      })
    })

    
  }catch(err){
    res.send(err.message);
  }
};

module.exports.loginUser = async(req,res)=>{
  const filter = req.query.filter || 'all';

  let{email,password} = req.body;
  
  let user = await userModel.findOne({email:email});
  
  if(!user) return res.status(402).send("Email or password incorrect")

  bcrypt.compare(password,user.password,async(err,result)=>{
    if(result){
      let token = generateToken(user);
      res.cookie("token",token);
      let products = await productModel.find();
      let success = req.flash("success");
      res.render('shop',{products,success,filter});
    }
    else{
      return res.status(402).send("Email or password incorrect")
    }
  })
}


module.exports.logout = (req,res)=>{
  res.cookie("token","")
  res.redirect('/');
}
