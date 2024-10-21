const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session')
const flash = require('connect-flash')

const db = require('./config/mongooseConnection')
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
const indexRouter = require("./routes/index");

const port = process.env.PORT || 3000;

require('dotenv').config(); //dotenv me variables h vo use me ajynge

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressSession({
  resave: false,
  saveUninitialized : false,//esa bnda aa rha h jo initialized nhi h
  secret : process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash()); //flash ko setup krne k liye session ki jrurat thi i.e. expresssession
app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'views'));

app.locals.BASE_URL = process.env.BASE_URL;

app.use("/", indexRouter);
app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);

app.listen(port,(err) => {
  if(err){
    console.log('Server ERROR',err);
    return;
  }
  console.log("server is running at 3000");
});