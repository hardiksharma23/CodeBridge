const express = require("express")
const router = express.Router()

const {
  login,
  signUp,
  sendOTP,
  getUserDetails
} = require("../controllers/Auth")


const { auth } = require("../middlewares/auth")


// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

router.get("/:userId", getUserDetails);


// Export the router for use in the main application
module.exports = router