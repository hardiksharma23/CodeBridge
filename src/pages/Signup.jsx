import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { setSignupData } from '../slices/authSlice'
import { useDispatch } from 'react-redux'
import { sendOtp } from '../services/operations/authAPI'


const Signup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        accountType: "User",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { accountType ,firstName, lastName, email, password, confirmPassword } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const signupData = {
            ...formData,
          }
      
          // Setting signup data to state
          // To be used after otp verification
          console.log("FormData before dispatch:", signupData);
          dispatch(setSignupData(signupData))
          console.log("Redux State after dispatch:", signupData);
          localStorage.setItem("signupData", JSON.stringify(signupData));
          // Send OTP to user for verification
          dispatch(sendOtp(formData.email, navigate))
          console.log("Navigating to Verify Email Page...");
      
          // Reset
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
    <div className='flex justify-center items-center max-w-full w-full my-auto mx-auto'>
        <div className='relative flex flex-col justify-center items-center max-w-md w-full p-8 bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-md shadow-green-300 overflow-hidden'>
            <h2 className='font-serif text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                Create Account
            </h2>
            <form onSubmit={handleOnSubmit} className='flex flex-col gap-y-2'>
                <input
                    className='absolute top-2 opacity-0 text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'
                    name='accountType'
                    value={accountType}
                    disabled
                    onChange={handleOnChange}
                />
                <input
                    className='w-full pl-10 0 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition-all duration-200'
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    value={firstName}
                    onChange={handleOnChange}
                />

                <input
                    className='w-full pl-10 0 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200'
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={handleOnChange}
                />

                <input
                    className='w-full pl-10 0 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200'
                    type='text'
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={handleOnChange}
                />
                
                <input
                    className='w-full pl-10 0 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200'
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={handleOnChange}
                />
                <input
                    className='w-full pl-10 0 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200'
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={handleOnChange}
                />

                <button type='submit' className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'>
                    Signup
                </button>

            </form>
        </div>
    </div>
  )
}

export default Signup