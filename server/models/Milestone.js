const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true 
    },
    techStack: {
        type: String,
    },
    description: {
        type: String 
    },
    completed: {
        type: Boolean, 
        default: false 
    },
    
})

module.exports = mongoose.model("Milestone", milestoneSchema);