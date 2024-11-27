const express = require('express');
const connection = require('./connection')
const routerAPI = require('./route/api');
const app = express();




// Add the MiddleWare 
app.use(express.json());

app.use('/api' , routerAPI);
// Database Connection 
connection('mongodb://localhost:27017/Blogs').then(()=>{
    console.log("Database Connection Sucessfully");
    
}).catch((error)=>{
    console.log("Database Connection Faild");
    
});



app.listen(8000 , ()=>{
    console.log("Sever is conntected to the 8000 port");
    
})