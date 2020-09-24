const mongoose=require('mongoose');
const User = require('../../models/user');
const user=require('../../models/user')


module.exports = {

    user: async(parent, { id }, context, info) => {
        //console.log(parent.id)
        const user=await User.findById({_id:mongoose.Types.ObjectId(parent.id)})
        if(!user){
            throw new Error('User not found.'); 
        }
        return user;
    },
    users: async(parent, args, context, info) => {
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
  }

};
