//mongooDB connection 
const mongoose=require('mongoose');
const url=process.env.DB_URL

mongoose.connect(url);

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error to connect the db'));

db.once('open',function(){
    console.log('Successfully connected to the DataBase!!!');
});
module.exports=db;