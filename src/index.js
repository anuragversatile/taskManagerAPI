const express = require("express");
const app = express();
require("./db/mongoose");


const userRouter=require('./routers/userRouter') 
const taskRouter=require('./routers/taskRouter') 
const port = process.env.PORT ;


app.use(express.json());
app.use(userRouter); 
app.use(taskRouter);

 

app.listen(port, () => {
  console.log("server is up", port);
});

// const jwt=require('jsonwebtoken')
// const myFunction=async()=>{
// const token=jwt.sign({_id:'abc123'},'thisistest',{expiresIn:'7 days'})
// console.log(token)
// const data=jwt.verify(token,'thisistest')
// console.log(data)
// }
// myFunction()

