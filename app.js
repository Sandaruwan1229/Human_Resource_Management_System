const express=require('express');
const app=express();
const session=require("express-session")
const bodyParser=require("body-parser")
const pgConnect = require('connect-pg-simple');
const helmet = require('helmet');


//use .env file for  our process
require('dotenv').config();

/* Init helmet and CORS */
app.use(helmet({contentSecurityPolicy: false,}));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.use(session({ 
  
    // It holds the secret key for session 
    store:new (pgConnect(session))({ conString: process.env.DATABASE_URL }),
  
    // Forces the session to be saved 
    // back to the session store 
    resave: false, 
    secret: '123456xxx',
    // Forces a session that is "uninitialized" 
    // to be saved to the store 
    saveUninitialized: false,
    cookie: {maxAge:30*3600*24}
}))


/* Define the static files and routes */
app.use('/assets', express.static('assets'));

 //app.use(express.static(path.join(__dirname,'/')));
app.use(require('./routes'))


app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(5000, function(){
    console.log("app is working on port 5000")
})