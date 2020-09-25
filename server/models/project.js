const mongoose=require('mongoose')

const projectSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        ref:'User'
    }
})

const Project = mongoose.model("Project",projectSchema);
module.exports=Project