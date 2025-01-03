const Project = require("../models/Project");
const Tag = require("../models/tags");
const User = require("../models/User");

const {uploadImageToCloudinary} = require("../utils/imageUploader");

//create course
exports.createProject = async (req,res) => {
    try {
        const{projectName, projectDescription, techStack, projectContent, githubUrl, tag} = req.body;

        const thumbnail = req.files.thumbnailImage;

        if(!projectName || !projectDescription || !techStack || !projectContent || !githubUrl || !thumbnail) {
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        const userId = req.user.id;
        const headDetails = await User.findById(userId);
        console.log("Project-Head Details: ", headDetails);

        if(!headDetails) {
            return res.status(404).json({
                success:false,
                message:"Project-Head Details not found",
            });
        }

        const tagDetails = await Tag.findById(tag);
        if(!tagDetails) {
            return res.status(404).json({
                success:false,
                message:"Tag Details not found",
            });
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newProject = await Project.create({
            projectName,
            projectDescription,
            projectHead: headDetails._id,
            techStack, 
            projectContent,
            githubUrl, 
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        });

        //add the new course in user schema for project head
        await User.findByIdAndUpdate(
            {_id: headDetails._id},
            {
                $push: {
                    projects: newProject._id
                }
            },
            {new:true},
        );
        
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data: newProject,
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create course",
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
                                                    contributors:true,})
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

