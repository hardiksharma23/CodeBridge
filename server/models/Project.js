const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        trim: true,
        required: true,
    },
    projectDescription: {
        type: String,
        trim: true,
    },
    projectHead: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    techStack:{
        type: String,
        required: true,
    },
    githubUrl: {
        type: String,
    },
    contributors: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        }
    ],
    thumbnail: {
        type:String,
    },
    
    tag: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    }



    
})

module.exports = mongoose.model("Project", projectSchema);