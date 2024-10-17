const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');
mongoose.connect(`${config.get("MONGODB_URI")}/hooodiee`)
.then(()=>{
  dbgr('connected to mongodb');
})
.catch((err)=>{
  dbgr('error connecting to mongodb ',err);
})

module.exports = mongoose.connection ;