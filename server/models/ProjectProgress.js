const mongoose = require('mongoose');

const projectProgress = new mongoose.Schema({
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    progressPercentage: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },

    milestones: [
        {
          type:mongoose.Schema.Types.ObjectId,
          ref: "Milestone"
        }
    ],


    

})

module.exports = mongoose.model("ProjectProgress", projectProgress);