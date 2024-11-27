const express = require('express');
const connection = require('./connection')
const app = express();


// Database Connection 
connection('').then(()=>{
    console.log("Database Connection Sucessfully");
    
}).catch((error)=>{
    console.log("Database Connection Faild");
    
})
app.listen(8000 , ()=>{
    console.log("Sever is conntected to the 8000 port");
    
})