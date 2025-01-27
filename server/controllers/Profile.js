const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
    try {
        const {firstName = "", lastName = "", gender = "", about = "", githubProfile = "", techStack } = req.body; 

        const id = req.user.id;

        // Normalize and validate techStack
        const techStackArray = Array.isArray(techStack)
            ? techStack
            : typeof techStack === "string"
            ? techStack.split(",").map((item) => item.trim())
            : [];

        if (!gender || !githubProfile || !techStackArray.length || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const userDetails = await User.findById(id)
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!userDetails.additionaldetails) {
            return res.status(404).json({
                success: false,
                message: "Profile details not found for this user",
            });
        }



        const profile = await Profile.findById(userDetails.additionaldetails)
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
        })
        await user.save()

        // // Find profile
        // const userDetails = await User.findById(id);
        // const profileId = userDetails.additionaldetails;
        // const profileDetails = await Profile.findById(profileId);

        // Update profile (no image field here)
        profile.gender = gender;
        profile.about = about;
        profile.githubProfile = githubProfile;
        profile.techStack = techStackArray;

        // await profileDetails.save();

        await profile.save()

        const updatedUserDetails = await User.findById(id)
        .populate("additionaldetails")
        .exec()

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};



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