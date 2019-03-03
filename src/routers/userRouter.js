const express=require('express');
const User = require("../models/user");
const auth=require('../middleware/auth')
const router=new express.Router();



router.post("/users",  async (req, res) => {
  const user = new User(req.body);

  try{
    await user.save();
    const token=await user.generateAuthToken()
    res.status(201).send({token,user})
  }
  catch(e){
    res.status(400).send(e)
 
  }

});

router.post('/users/login',async(req,res)=>{
  try{
const user=await User.findByCredentials(req.body.email,req.body.password)
const token=await user.generateAuthToken()
res.send({user,token})
  }catch(e)
{
res.status(400).send()
}})

router.get("/users/:id",async (req, res) => {
  const _id = req.params.id;
  try{
const user=await User.findById({_id})
if(!user){
  return res.status(404).send()
}
res.send(user)

  }catch(e){
res.status(500).send()
  }
  
});
router.get("/users",  auth,async(req, res) => {
  try{
    const users=await User.find({})
    res.send(users)
  }
  catch(e){
    res.status(500).send()
  }
  
    
});
router.get("/usersme",  auth,async(req, res) => {

  res.send(req.user)


   
});
router.post('/users/logout',auth,async(req,res)=>{
  try{
req.user.tokens=req.user.tokens.filter((token)=>{
  return token.token!==req.token
})
await req.user.save()
res.send()
  }
  catch(e){
res.status(500).send()
  }
})
router.post('/users/logoutAll',auth,async(req,res)=>{
  try{
req.user.tokens=[]
await req.user.save()
res.send()
  }
  catch(e){
res.status(500).send()
  }
})
router.patch('/users/me',auth,  async(req,res)=>{   
   const updates=Object.keys(req.body)
  const allowedUpdates=['name','email','password','age']
  const isValid=updates.every((updates)=>allowedUpdates.includes(updates))
  if(!isValid){
    return res.status(400).send({error:'Invalid Operation'})
  }
  try{

updates.forEach((update)=>req.user[update]=req.body[update])
await req.user.save();

res.send(req.user)
  }
  catch(e){
res.status(400).send(e)

  }
})


router.delete('/users/me',auth,async(req,res)=>{
  try{

  await req.user.remove()
  res.send(req.user)
}
catch(e){
  res.status(500).send(e)
}
})
module.exports=router