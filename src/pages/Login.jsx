import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/operations/authAPI'

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setLoading(true);
        dispatch(login(email, password, navigate))
        setLoading(false)
    }

    return (
        <div className='flex items-center justify-center min-h-screen '>
            <div className='relative flex flex-col w-full max-w-md p-8 space-y-8 rounded-3xl backdrop-blur-xl bg-gray-800/70 border border-gray-700 shadow-2xl shadow-emerald-900/30'>
                {/* Header Section */}
                <div className='space-y-4 text-center'>
                    <h1 className='text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent'>
                        Welcome Back
                    </h1>
                    <p className='text-gray-400'>Please sign in to continue</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleOnSubmit} className='space-y-6'>
                    <div className='space-y-4'>
                        <div className='relative'>
                            <input
                                className='w-full px-4 py-3 pl-12 text-gray-200 placeholder-gray-500 transition-all duration-200 border rounded-2xl bg-gray-900/40 border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 focus:bg-gray-900/70 hover:border-gray-500'
                                type='email'
                                name='email'
                                placeholder='Email'
                                value={email}
                                onChange={handleOnChange}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-5 h-5 top-4 left-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>

                        <div className='relative'>
                            <input
                                className='w-full px-4 py-3 pl-12 text-gray-200 placeholder-gray-500 transition-all duration-200 border rounded-2xl bg-gray-900/40 border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 focus:bg-gray-900/70 hover:border-gray-500'
                                type='password'
                                name='password'
                                placeholder='Password'
                                value={password}
                                onChange={handleOnChange}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-5 h-5 top-4 left-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>

                    <button 
                        disabled={loading}
                        type='submit' 
                        className='w-full px-6 py-3.5 font-semibold text-white transition-all duration-200 bg-emerald-600 rounded-2xl hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-400/30 disabled:opacity-70 disabled:cursor-not-allowed'
                    >
                        {loading ? (
                            <div className='flex items-center justify-center space-x-2'>
                                <div className='w-4 h-4 border-2 border-t-transparent rounded-full animate-spin'></div>
                                <span>Signing In...</span>
                            </div>
                        ) : 'Log In'}
                    </button>
                </form>

                {/* Additional Links */}
                <div className='space-y-4 text-sm text-center'>
                    <p className='text-gray-400'>
                        Don't have an account?{' '}
                        <a href='/signup' className='font-semibold text-emerald-400 hover:text-emerald-300 hover:underline'>
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login