const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender: {
        type:String,
    },
    about: {
        type: String,
        trim: true,
    },
    githubProfile: {
        type: String,
    },
    techStack: [
        {
            type:String,
        }
    ],
    

})

module.exports = mongoose.model("Profile", profileSchema);