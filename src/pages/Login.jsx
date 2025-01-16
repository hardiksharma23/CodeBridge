import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/operations/authAPI'

const Login = () => {

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
        dispatch(login(email, password, navigate))
    }

  return (
    <div className='flex justify-center items-center max-w-full w-full my-auto mx-auto'>
        <div className='flex flex-col justify-center items-center max-w-md w-full p-8 bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-md shadow-green-300'>
            <h2 className='font-serif text-3xl pb-5 font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                Welcome Back
            </h2>
            <form onSubmit={handleOnSubmit}
                    className='flex flex-col gap-y-3'
            >
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

                <button type='submit' className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'>
                    Log In
                </button>
            </form>
        </div>
        
    </div>
    
  )
}

export default Login