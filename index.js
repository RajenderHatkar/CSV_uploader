const express=require("express");
const port=7001;
const db = require('./config/mongoose');
const path = require('path');
const multer = require('multer')
const app=express();

app.use(express.urlencoded({ extended: false }));
//static files set up
const assetsPath = path.join(__dirname, 'assets');
app.use('/assets', express.static(assetsPath));

//route setup
app.use('/',require('./Routers/index'));
//app.use(express.json());

//view engine to render ejs files aka html
//install ejs
app.set('view engine','ejs');
app.set('views','./views')


app.listen(port, (err)=>{
    if(err){
        console.log("something went wrong:",err);
       
    }
    console.log("running on port:" ,port);
})