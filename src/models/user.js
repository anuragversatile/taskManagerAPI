const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('./task')
const userSchema=new mongoose.Schema({
  name:{
type:String,
default:'Annonymous',
trim:true,
validate(value){
  if(value.length===0){
    throw new Error('Name should be present')
  }
}
  },
  email:{
    type:String,
    unique:true,
    required:true,
    lowercase:true,
    trim:true,
    validate(value){
if(!validator.isEmail(value)){
  throw new Error('Email is invlid')
}
    }
  },
  password:{
    type:String,
    required:true,
    minlength:7,
    trim:true,
    validate(value){
      // if(value.length<6)
      // throw new Error('Value must be greater then 6')
      if(value.includes('password'))
      throw new Error("value must not contain string password")
    }
  },
  age:{
type:Number,
default:0,
validate(value){

  if(value<0){
    throw new Error('Age must be positive no')
  }
}
  },
  tokens:[{
token:{
  type:String,
  required:true
}
  }]
})
userSchema.virtual('tasks',{
  ref:'Task',
localField:'._id',
foreignField:'owner'})
userSchema.methods.generateAuthToken= async function(){
  const user=this
  const token =jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
  user.tokens=user.tokens.concat({token})
  await user.save();
  return token
}

userSchema.methods.toJSON=function(){

  const user=this
  const userObject=user.toObject()
  delete userObject.password
  delete userObject.tokens
  return userObject
}

userSchema.statics.findByCredentials=async(email,password)=>{
  const user=await User.findOne({email})

  if(!user)
  {
    throw new Error('Unable to login')
  }
  const isMatch=await bcrypt.compare(password,user.password)
  if(!isMatch){
    throw new Error('Unable to login')
  }
  return user
}



//hash the plain text passwordn before saving
userSchema.pre('save',async function(next){
  const user=this
if(user.isModified('password')){
  user.password=await bcrypt.hash(user.password,8)
}

  next()
}   ) 

userSchema.pre('remove',async function(next){
  const user=this
 await  Task.deleteMany({owner:user._id})

  next()
})
const User=mongoose.model('User',userSchema)

module.exports=User