const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum:["Admin","User"],
        required:true,
    },
    additionaldetails: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    projects: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Project",
        }
    ],
    image: {
        type:String,
        required:true,
    },
    projectProgress: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "ProjectProgress",
        }
    ],

})

module.exports = mongoose.model("User", userSchema);