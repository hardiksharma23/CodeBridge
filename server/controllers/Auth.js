const User = require("../models/User");
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require("../models/Profile");
const jwt = require('jsonwebtoken');

require('dotenv').config();


//sendOtp

exports.sendOTP = async (req,res) => {

    try {
        const {email} = req.body;

        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent) {
            return res.status(401).json({
                success:false,
                message: "user already registered",
            })
        };

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        console.log("otp generated: ", otp);

        let result = await OTP.findOne({otp: otp});

        while(result) {
            otp = otpGenerator(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({otp: otp});
        }


        const otpPayload = {email, otp};

        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: "otp created successful",
            otp,
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }

}

//SignUp

exports.signUp = async (req,res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;

        if(!firstName || !lastName || !email || !accountType || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "all fields are required",
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "password and confirm password does not matched",
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already existed",
            });
        }

        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);

        if(recentOtp.length === 0) {
            return res.status(400).json({
                success:false,
                message:'Otp not found',
            })
        } else if(otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success:false,
                message:'Otp Invalid',
            });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //entry created in db
        const profileDetails = await Profile.create({
            gender:null,
            githubProfile:null,
            about: null,
            techStack: [],
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionaldetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        return res.status(200).json({
            success:true,
            message:"user is registered successfully",
            user,
        })
        
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "user can not be registered. Please try again",
        })
    }
}

//LogIn
exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(403).json({
                success:false,
                message: 'All fields are required,please try again',

            });
        }

        const user = await User.findOne({ email }).populate("additionaldetails").populate("projects");

        if(!user) {
            return res.status(401).json({
                success:false,
                message: 'User is not register, Please signUp first'
            });
        }

        if(await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.token = token;
            user.password = undefined;
            const option = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }
            res.cookie("token", token, option).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            })
        }
        else {
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            })
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: 'Login failure, Please try again',
        });
    }
}

