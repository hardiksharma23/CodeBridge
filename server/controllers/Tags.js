const Tag = require('../models/tags');

exports.createTag = async (req,res) => {
    try {
        const {name, description} = req.body;

        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }

        const tagDetails = await Tag.create({
            name:name,
            description:description, 
        });
        console.log(tagDetails);

        return res.status(200).json({
            success:true,
            message:'Tag created successfully',
        })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.showAlltags = async (req, res) => {
    try {
        // console.log("Fetching all tags...");
        const allTags = await Tag.find({}, { name: true, description: true });
        // console.log("Tags fetched:", allTags);
        return res.status(200).json({
            success: true,
            message: 'All tags are returned',
            allTags,
        });
    } catch (error) {
        console.error("Error fetching tags:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};