const  mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  fullName : {
    type: String,
    minLength : 3 ,
    trim: true,
  },
  email : String,
  password: String,
  cart :{
    type :Array,
    default: []
  },
  contact : Number,
  picture : String,
  orders:{
    type :Array,
    default: []
  }
})
module.exports = mongoose.model('user',userSchema);