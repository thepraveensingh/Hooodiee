const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dbgr = require('debug')('development:mongoose');

// Load environment variables from .env file
dotenv.config();

// Now access the MONGODB_URI from environment variables
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  dbgr('MongoDB URI is undefined! Please check your .env file.');
  process.exit(1);  // Exit the app if the URI is missing
}

mongoose.connect(mongoUri)
  .then(() => {
    dbgr('connected to mongodb');
  })
  .catch((err) => {
    dbgr('error connecting to mongodb ', err);
  });

module.exports = mongoose.connection;
