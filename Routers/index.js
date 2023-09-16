const express=require('express');
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
const multer = require("multer");
const router=express.Router();
const upload = multer({ dest: "uploads/" });

console.log("router running");

const home_controller=require('../Controllers/home_controller');
const upload_controller = require('../Controllers/upload_controller');


router.get('/',home_controller.home);
router.post("/upload", upload.single("file"), home_controller.upload);
router.get('/view/:fileId', upload_controller.view)


module.exports=router;