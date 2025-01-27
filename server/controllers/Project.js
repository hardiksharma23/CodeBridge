const Project = require("../models/Project");
const Tag = require("../models/tags");
const User = require("../models/User");

const {uploadImageToCloudinary} = require("../utils/imageUploader");

//create course
exports.createProject = async (req, res) => {
    try {
        const { projectName, projectDescription, techStack, githubUrl, tag: tagName } = req.body;

        const thumbnail = req.files?.thumbnailImage;

        if (!projectName || !projectDescription || !techStack || !githubUrl || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const userId = req.user.id;
        const headDetails = await User.findById(userId);

        if (!headDetails) {
            return res.status(404).json({
                success: false,
                message: "Project-Head Details not found",
            });
        }

        // Check if the tag exists, create it if not
        let tagDetails = await Tag.findOne({ name: tagName });

        if (!tagDetails) {
            tagDetails = await Tag.create({
                name: tagName,
            });
            console.log("New Tag Created: ", tagDetails);
        }

        // Upload the thumbnail to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // Create the new project
        const newProject = await Project.create({
            projectName,
            projectDescription,
            projectHead: headDetails._id,
            techStack,
            githubUrl,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        });

        // Add the new project to the user's project list
        await User.findByIdAndUpdate(
            { _id: headDetails._id },
            {
                $push: {
                    projects: newProject._id,
                },
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Project created successfully",
            data: newProject,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create project",
            error: error.message,
        });
    }
};

//getAllCourses
exports.showAllProjects = async (req,res) => {
    try {
        const allProjects = await Project.find({}, {projectName:true,
                                                    techStack:true,
                                                    thumbnail:true,
                                                    projectHead:true,
                                                    contributors:true,
                                                    tag:true,})
                                                    .populate("tag", "name")
                                                    .populate("projectHead")
                                                    .exec();
        return res.status(200).json({
            success: true,
            message: "Data for all projects are fetched successfully",
            data: allProjects,
        })
    }

    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"cannot fetch Projects data",
            error: error.message,
        });    
    }
}

