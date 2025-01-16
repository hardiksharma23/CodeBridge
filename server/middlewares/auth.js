const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

//auth
exports.auth = (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", "");

        if(!token) {
            return res.status(401).json({
                success:false,
                message: 'Token is missing',
            })
        }

        // verify the token

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode
        }
        catch(err) {
            return res.status(401).json({
                success:false,
                message:'Token is invalid',
            });
        }

        next();
    }
    catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something is wrong while validating the token',
        });
    }
}

//isContributers
exports.isUser = async (req, res, next) => {
    try {
        if(req.user.accountType !== "Contributor") {
            return res.status(401).json({
                success:false,
                message: 'This is a protected route for student only',
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again',
        });
    }
}

//isHead


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        // console.log("Printing account type",accountType)
        if(req.user.accountType !== "Admin") {
            return res.status(401).json({
                success:false,
                message: 'This is a protected route for Admin only',
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again',
        });
    }
}
