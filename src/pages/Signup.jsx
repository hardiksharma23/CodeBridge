import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSignupData } from '../slices/authSlice'
import { sendOtp } from '../services/operations/authAPI'
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        accountType: "User",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const { accountType, firstName, lastName, email, password, confirmPassword } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const signupData = { ...formData }
        
        dispatch(setSignupData(signupData))
        localStorage.setItem("signupData", JSON.stringify(signupData))
        dispatch(sendOtp(formData.email, navigate))
        
        setFormData({
            accountType: "User",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 mt-16">
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
            ) : (
                <div className="relative flex flex-col w-full max-w-md p-8 space-y-8 rounded-3xl backdrop-blur-xl bg-gray-800/70 border border-gray-700 shadow-2xl shadow-emerald-900/30">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                            Create Account
                        </h2>
                        <p className="mt-2 text-sm sm:text-base text-gray-300">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleOnSubmit} className="mt-6 space-y-6">
                        <div className="rounded-md shadow-sm space-y-4">
                            <input 
                                type="hidden"
                                name="accountType"
                                value={accountType}
                                onChange={handleOnChange}
                            />

                            {/* First Name */}
                            <div className="relative">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 text-sm sm:text-base pl-12 text-gray-200 placeholder-gray-500 transition-all duration-200 border rounded-2xl bg-gray-900/40 border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 focus:bg-gray-900/70 hover:border-gray-500"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={handleOnChange}
                                />
                                <div className="absolute w-5 h-5 top-4 left-4 text-gray-500">
                                    <CgProfile />
                                </div>
                            </div>
                            

                            {/* Last Name */}
                            <div className="relative">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 text-sm sm:text-base pl-12 text-gray-200 placeholder-gray-500 transition-all duration-200 border rounded-2xl bg-gray-900/40 border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 focus:bg-gray-900/70 hover:border-gray-500"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={handleOnChange}
                                />
                                <div className="absolute w-5 h-5 top-4 left-4 text-gray-500">
                                    <CgProfile />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 text-sm sm:text-base pl-12 text-gray-200 placeholder-gray-500 transition-all duration-200 border rounded-2xl bg-gray-900/40 border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 focus:bg-gray-900/70 hover:border-gray-500"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={handleOnChange}
                                />
                                <div  className="absolute w-5 h-5 top-4 left-4 text-gray-500">
                                    <MdOutlineMail />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 text-sm sm:text-base pl-12 text-gray-200 placeholder-gray-500 transition-all duration-200 border rounded-2xl bg-gray-900/40 border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 focus:bg-gray-900/70 hover:border-gray-500"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handleOnChange}
                                />
                                <div  className="absolute w-5 h-5 top-4 left-4 text-gray-500">
                                    <RiLockPasswordFill />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 text-sm sm:text-base pl-12 text-gray-200 placeholder-gray-500 transition-all duration-200 border rounded-2xl bg-gray-900/40 border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 focus:bg-gray-900/70 hover:border-gray-500"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={handleOnChange}
                                />
                                <div  className="absolute w-5 h-5 top-4 left-4 text-gray-500">
                                    <RiLockPasswordFill />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all transform hover:scale-[1.02] active:scale-95"
                        >
                            Create Account
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Signup
