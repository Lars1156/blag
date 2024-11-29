const express = require('express');
const connection = require('./connection')
const routerAPI = require('./route/api');
const cros = require('cors');
const app = express();

// Add the MiddleWare 
// Frontend to Backend Connection Using Cros
crosOption = {
    origin:'http://localhost:3000',
    optionSuccessfulStatus: 200
}
// Database Connection 
connection('mongodb://localhost:27017/Blogs').then(()=>{
    console.log("Database Connection Sucessfully");
    
}).catch((error)=>{
    console.log("Database Connection Faild");
    
});
app.use(express.json());
app.use(cros(crosOption));
app.use('/api' , routerAPI);


app.listen(8000 , ()=>{
    console.log("Sever is conntected to the 8000 port");
    
})