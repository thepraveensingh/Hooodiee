const  mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  fullName : {
    type: String,
    minLength : 3 ,
    trim: true,
  },
  email : String,
  password: String,
  cart :[{
    type :mongoose.Schema.Types.ObjectId,
    ref: "product",
  }],
  contact : Number,
  picture : String,
  orders:{
    type :Array,
    default: []
  },
  profilePic :{
    type : Buffer,
    default : null
  }
})
module.exports = mongoose.model('user',userSchema);