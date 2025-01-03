const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    description: {
        type: String,
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
})

module.exports = mongoose.model("Tag" , tagSchema);