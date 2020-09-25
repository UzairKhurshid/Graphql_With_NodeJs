const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:String
    },
    phones:[{
        name: {
            type:String
        },
        model:{
            type:String
        }
    }]
})

const User = mongoose.model("User",userSchema);
module.exports=User