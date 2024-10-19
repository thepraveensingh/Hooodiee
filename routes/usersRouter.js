const express = require('express');
const router = express.Router();
const {registerUser,loginUser,logout} = require('../controllers/authController')
const upload = require('../config/multerConfig');
const userModel = require('../models/userModel');
const isLoggedIn = require('../middlewares/isLoggedIn')

router.get('/',(req,res)=>{
  res.send('hey');
})
router.post('/register',registerUser)

router.post('/login',loginUser)

router.post('/profile/uploadPic',isLoggedIn,upload.single('profilePic'),async (req,res) =>{
   try{
      if (!req.user) {
         return res.status(403).send('User not authenticated');
     }
     let user = await userModel.findOne({ email: req.user.email })
     if (!user) {
         return res.status(404).send('User not found');
     }
      user.profilePic = req.file.buffer;
      await user.save();
      res.status(200).send('Profile picture updated successfully');
   }
   catch(err){
    console.error('Error updating profile picture:', err);
    res.status(500).send('Server error');
   }

})

router.get('/logout',logout);
module.exports = router;