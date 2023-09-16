//mongooDB connection 
const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/CSV_File_uploder_Test');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error to connect the db'));

db.once('open',function(){
    console.log('Successfully connected to the DataBase!!!');
});
module.exports=db;