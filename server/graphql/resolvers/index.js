const mongoose=require('mongoose');
const User = require('../../models/user');
const user=require('../../models/user')
const Project=require('../../models/project')
const jwt=require('jsonwebtoken')


module.exports = {
    //Query Resolvers
    login:async(parent,args, context, info)=>{
      const user=await User.findOne({name:parent.name,email:parent.email})
      if(!user){
        throw new Error("User not found")
      }
      const userID=user._id
      const token=jwt.sign({userID,name:user.name},'mySecretkey',{expiresIn:'1h'})
      return {userID:userID,token:token,tokenExpiration:1}
    },
    user: async(parent, { id }, context, info) => {
        //console.log(parent.id)
        const user=await User.findById({_id:mongoose.Types.ObjectId(parent.id)})
        if(!user){
            throw new Error('User not found.'); 
        }
        return user;
    },
    users: async(parent, args,req, context, info) => {
      if(!req.isAuth){
        throw new Error("not Authorized")
      }  
      const users=await User.find()
        if(!users){
            throw new Error("Users not found")
        }
        return users;
    },
    hello:()=>{
        console.log("in hello resolver")
        return "hi";
    },
    projects: async(parent, args, context, info) => {
      //console.log(parent.id)
      const proj=await Project.find().populate('owner')
      if(!proj){
          throw new Error('Project not found.'); 
      }
      console.log(proj)
      return proj;
    },
  //Mutation Resolvers
  createUser: async(parent, obj, context, info) => {
    
    console.log(parent.name)
    console.log(parent.email)
    const user=new User(parent)
    await user.save()
    return user;
  },
  updateUser: async(parent, obj, context, info) => {
    console.log(obj)
    console.log(parent)
    const user=await User.findById({_id:mongoose.Types.ObjectId(parent.id)})
    user.name=parent.name
    user.email=parent.email
    user.age=parent.age
    await user.save()
    return user;
  },
  deleteUser: async(parent, { id }, context, info) => {
    console.log(id)
    console.log(parent.id)
    const user=await User.findByIdAndDelete({_id:mongoose.Types.ObjectId(parent.id)})
    return user;
  },
  createProject: async(parent, obj, context, info) => {
    
    console.log(parent.name)
    console.log(parent.description)
    if(!user){
      throw new Error("owner for this project not found")
    }
    const proj=new Project({
      name:parent.name,
      description:parent.description,
      owner:parent.ownerID
    })
    await proj.save()
    return proj;
  },
};
