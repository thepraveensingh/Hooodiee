const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownerModel')

if(process.env.NODE_ENV === "development") {
  router.post('/create',async(req,res)=>{

    let owners = await ownerModel.find();
    if(owners.length > 0){
      return res.status(503).send("you dont have permission to create the owner");
    }
    let{fullName ,email ,password} = req.body;
    let createdOwner = await ownerModel.create({
      fullName,
      email,
      password,
  })
    res.status("201").send(createdOwner);

  })
}
router.get('/admin',(req,res)=>{
  let success = req.flash("success")
  res.render('createProducts',{success})
})

router.get('/',(req,res)=>{
  res.send('hey');
})


module.exports = router;