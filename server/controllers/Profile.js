const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req,res) => {
    try {
        const {gender, dateOfBirth = "", about = "", githubProfile, techStack} = req.body;
        
        const id = req.user.id;

        if(!gender || !githubProfile || !techStack || !id) {
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionaldetails;
        const profileDetails = await Profile.findById(profileId);

        //update profile
        profileDetails.gender = gender;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.githubProfile = githubProfile;
        profileDetails.techStack = techStack;

        await profileDetails.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profileDetails,
        });

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            error:error.message,
        });
    }
}

exports.getAllUserDetails = async (req,res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionaldetails").exec();

        return res.status(200).json({
            success:true,
            message:"User details are fetched successfully",
            userDetails,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}