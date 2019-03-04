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



